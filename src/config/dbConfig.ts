import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { User } from 'src/shared/users/entities/user.entity';

export const dbConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    password: configService.get('DB_PASSWORD'),
    username: configService.get('DB_USERNAME'),
    entities: [User],
    database: configService.get('DB_NAME'),
    synchronize: true,
    logging: true,
  }),
};
