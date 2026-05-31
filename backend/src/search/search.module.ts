import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { SearchService } from './search.service';

@Module({
  imports: [
    ElasticsearchModule.register({
      node: 'https://my-elasticsearch-project-ed577b.es.us-central1.gcp.elastic.cloud:443',
      auth: {
        username: 'elastic',
        password:
          'LU9DLWZKNEJiSzlyWnFKWC1FcTY6ZHJSRUR5WDFUMHVPOTU3Mk5FQXNSZw==',
      },
    }),
  ],
  providers: [SearchService],
  exports: [SearchModule],
})
export class SearchModule {}
