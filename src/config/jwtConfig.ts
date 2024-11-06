import { JwtModuleAsyncOptions } from '@nestjs/jwt';

export const jwtConfig: JwtModuleAsyncOptions = {
  global: true,
  useFactory: () => ({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '1h' },
  }),
};
