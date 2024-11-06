import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/shared/users/users.service';
import { Currencies } from 'src/enums/Currencies';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    try {
      let user = await this.usersService.findByGoogleId(profile.id);
      if (!user) {
        user = await this.usersService.create({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails?.[0]?.value || '',
          currency: Currencies.USD,
        });
      }
      const payload = { id: user.id, email: user.email };

      const access_token = await this.jwtService.signAsync(payload);

      return done(null, { ...user, access_token });
    } catch (error) {
      done(error, false);
    }
  }
}
