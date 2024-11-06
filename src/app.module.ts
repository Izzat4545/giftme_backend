import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { dbConfig } from './config/dbConfig';
import { UsersModule } from './shared/users/users.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync(dbConfig),
    UsersModule,
    AuthModule,
  ],
  providers: [AppService],
})
export class AppModule {}
