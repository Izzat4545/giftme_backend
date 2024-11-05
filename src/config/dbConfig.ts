import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const dbConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  password: process.env.DB_PASSWORD,
  username: process.env.DB_USERNAME,
  entities: [],
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
};
