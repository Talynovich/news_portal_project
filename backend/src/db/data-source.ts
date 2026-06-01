import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { Users } from '../users/entities/user.entity';
import { News } from '../news/entities/news.entity';
import { Comment } from '../comments/entities/comment.entity';
import { Image } from '../upload/entities/image.entity';

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: '147.45.98.194',
  port: 5432,
  username: 'postgres',
  password: 'admin123',
  database: 'ny_times',

  entities: [Users, News, Comment, Image],
  migrations: ['src/db/migrations/*.ts'],
  seeds: ['src/db/seeds/*.seed.ts'],
};

export default new DataSource(options);
