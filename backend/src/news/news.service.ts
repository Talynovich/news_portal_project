import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { News } from './entities/news.entity';
import { Image } from '../upload/entities/image.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, In, Repository, DataSource } from 'typeorm';
import { SearchService } from '../search/search.service';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News) private newsRepository: Repository<News>,
    private readonly searchService: SearchService,
    private readonly dataSource: DataSource,
  ) {}

  async create(userId: number, dto: CreateNewsDto) {
    const savedNews = await this.dataSource.transaction(async (manager) => {
      if (dto.imageId) {
        const image = await manager.findOne(Image, {
          where: { id: dto.imageId },
        });

        if (!image) {
          throw new NotFoundException(`Image with ID ${dto.imageId} not found`);
        }

        if (image.assigned) {
          throw new BadRequestException(
            'This image is already linked to another news item',
          );
        }
        image.assigned = true;
        await manager.save(Image, image);
      }
      const news = manager.create(News, {
        ...dto,
        author: { id: userId },
        imageId: dto.imageId ?? undefined,
      });
      return await manager.save(News, news);
    });
    try {
      await this.searchService.indexNews({
        id: savedNews.id,
        title: savedNews.title,
        description: savedNews.description,
      });
    } catch (error) {
      console.error('Failed to index the news item in Elastic:', error);
    }

    return savedNews;
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    search?: string,
  ): Promise<{ data: News[]; total: number }> {
    if (page <= 0) {
      throw new BadRequestException(
        `The page parameter cannot be less than or equal to 0`,
      );
    }

    if (search && search.trim() !== '') {
      const formattedQuery = search.trim();

      const { ids, total } = await this.searchService.searchNews(
        formattedQuery,
        page,
        limit,
      );

      if (ids.length === 0) {
        return { data: [], total: 0 };
      }
      const data = await this.newsRepository.find({
        where: { id: In(ids) },
        relations: ['author'],
        order: {
          createdAt: 'DESC',
        },
      });

      return { data, total };
    }
    const options: FindManyOptions<News> = {
      relations: ['author'],
      order: {
        createdAt: 'DESC',
      },
      take: limit,
      skip: (page - 1) * limit,
    };

    const [data, total] = await this.newsRepository.findAndCount(options);
    return { data, total };
  }

  async findOne(id: number) {
    const news = await this.newsRepository.findOne({
      relations: ['author', 'comments'],
      where: { id },
    });
    if (!news) {
      throw new NotFoundException(`Nested with id ${id} not found`);
    }
    return news;
  }

  async update(
    id: number,
    userId: number,
    updateNewsDto: UpdateNewsDto,
  ): Promise<News> {
    const news = await this.newsRepository.findOne({
      where: { id },
      relations: ['author'],
    });

    if (!news) {
      throw new NotFoundException(`News item with id ${id} not found`);
    }
    if (news.author.id !== userId) {
      throw new ForbiddenException("You cannot edit someone else's news.");
    }

    const updatedNews = this.newsRepository.merge(news, updateNewsDto);

    return await this.newsRepository.save(updatedNews);
  }

  async remove(id: number, userId: number) {
    const result = await this.newsRepository.delete({
      id: id,
      author: { id: userId },
    });

    if (result.affected === 0) {
      throw new ForbiddenException(
        `You can't delete someone else's news or it doesn't exist.`,
      );
    }

    return { message: 'Deleted successfully' };
  }
}
