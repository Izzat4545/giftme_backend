import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Request, Response } from 'express';
import { GoogleOAuthGuard } from 'src/common/google-oauth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google/callback')
  @UseGuards(GoogleOAuthGuard)
  googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const user = req.user;
    const frontendLink = process.env.FRONTEND_LINK;
    return res.redirect(
      `${frontendLink}/auth/callback?token=${user.access_token}`,
    );
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto.email, loginDto.password);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(
      registerDto.name,
      registerDto.email,
      registerDto.password,
    );
  }
}
