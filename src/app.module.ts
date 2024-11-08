import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { dbConfig } from './config/dbConfig';
import { UsersModule } from './shared/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { CacheModule } from '@nestjs/cache-manager';
import { cacheConfig } from './config/cacheConfig';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync(dbConfig),
    UsersModule,
    CacheModule.registerAsync(cacheConfig),
    AuthModule,
  ],
  providers: [AppService],
})
export class AppModule {}
