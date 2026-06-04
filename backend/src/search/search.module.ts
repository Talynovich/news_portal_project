import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { Module } from '@nestjs/common';
import { SearchService } from './search.service';

@Module({
  imports: [
    ElasticsearchModule.register({
      node: 'https://my-elasticsearch-project-ed577b.es.us-central1.gcp.elastic.cloud:443',
      auth: {
        apiKey: 'LU9DLWZKNEJiSzlyWnFKWC1FcTY6ZHJSRUR5WDFUMHVPOTU3Mk5FQXNSZw==',
      },
    }),
  ],
  providers: [SearchService],
  exports: [SearchService],
})
export class SearchModule {}
