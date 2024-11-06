import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/shared/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/jwtConfig';

@Module({
  imports: [UsersModule, JwtModule.registerAsync(jwtConfig)],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
