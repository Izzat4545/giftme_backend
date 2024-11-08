import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/shared/users/users.service';
import * as bcrypt from 'bcrypt';
import { generateHashedPassword } from 'src/utils/genetateHashedPassword';
import { Currencies } from 'src/enums/Currencies';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    // If the user has no password (registered via Google), return an error
    if (!user.password) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const isPasswordValid = await bcrypt.compare(
      password + user.salt,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { id: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(name: string, email: string, password: string) {
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new UnauthorizedException('This user already exists');
    }
    const { hashedPassword, salt } = await generateHashedPassword(password);

    const user = await this.usersService.create({
      email,
      name,
      password: hashedPassword,
      salt,
      currency: Currencies.USD,
    });

    const payload = { id: user.id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async resetPassword(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException("This email doesn't exist");
    }

    // If the user has a password, check if the new password matches the old one
    if (user.password) {
      const isPasswordSame = await bcrypt.compare(
        password + user.salt,
        user.password,
      );

      if (isPasswordSame) {
        throw new Error(
          'Please enter a new password, not the same as the old one.',
        );
      }
    }

    // If user has no password (likely registered via Google), skip comparison and directly set the new password
    const { hashedPassword, salt } = await generateHashedPassword(password);

    // Update the user's password and salt
    await this.usersService.update(user.id, { password: hashedPassword, salt });
  }
}
