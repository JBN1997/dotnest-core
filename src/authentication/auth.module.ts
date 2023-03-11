import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PasswordService } from './services/password.service';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '@models/users/users.module';

@Module({
   imports: [
      UsersModule,
      PassportModule,
      JwtModule.register({
         secret: process.env.JWT_SECRET_KEY,
         signOptions: { expiresIn: '1d' },
      }),
   ],
   providers: [AuthService, JwtService, PasswordService, JwtStrategy],
   exports: [PasswordService],
})
export class AuthModule {}
