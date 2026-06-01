import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class SearchService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async searchNews(text: string, page: number, limit: number) {
    const from = (page - 1) * limit;

    const result = await this.elasticsearchService.search({
      index: 'news',
      from: from,
      size: limit,
      query: {
        multi_match: {
          query: text,
          fields: ['title', 'description'],
          fuzziness: 'AUTO',
        },
      },
    });

    const total =
      typeof result.hits.total === 'number'
        ? result.hits.total
        : result.hits.total?.value || 0;
    const ids = result.hits.hits.map((hit) => Number(hit._id));

    return { ids, total };
  }
  async indexNews(news: { id: number; title: string; description: string }) {
    return this.elasticsearchService.index({
      index: 'news',
      id: news.id.toString(),
      document: {
        id: news.id,
        title: news.title,
        description: news.description,
      },
    });
  }
}
