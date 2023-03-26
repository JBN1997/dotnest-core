import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PasswordService } from './services/password.service';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { AuthMiddleware } from './auth.middleware';
import { UsersModule } from '@models/users.module';

@Module({
   imports: [
      UsersModule,
      PassportModule,
      JwtModule.register({
         secret: process.env.JWT_SECRET_KEY,
         signOptions: { expiresIn: '1d' },
      }),
   ],
   controllers: [AuthController],
   providers: [AuthService, JwtService, PasswordService, JwtStrategy, AuthMiddleware],
   exports: [PasswordService, AuthMiddleware, JwtService],
})
export class AuthModule {}
