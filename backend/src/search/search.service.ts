// search.service.ts
import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class SearchService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async searchNews(text: string, page: number, limit: number) {
    const from = (page - 1) * limit;

    const result = await this.elasticsearchService.search({
      index: 'news',
      from: from, // Смещение (аналог skip)
      size: limit, // Количество (аналог take)
      query: {
        multi_match: {
          query: text,
          fields: ['title', 'description'], // Ищем по заголовку и описанию
          fuzziness: 'AUTO', // Бонус: включит поиск с опечатками!
        },
      },
    });

    const total =
      typeof result.hits.total === 'number'
        ? result.hits.total
        : result.hits.total?.value || 0;

    // Извлекаем только ID найденных документов
    const ids = result.hits.hits.map((hit) => Number(hit._id));

    return { ids, total };
  }
}
