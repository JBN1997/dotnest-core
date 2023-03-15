import { User } from '@models/users/entities/user.entity';
import { UserService } from '@models/users/services/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dto/login.dto';
import { SignInDto } from '../dto/signin.dto';
import { PasswordService } from './password.service';

@Injectable()
export class AuthService {
   constructor(
      private readonly jwtService: JwtService,
      private readonly userService: UserService,
      private readonly passwordService: PasswordService,
   ) {}

   async validateUser(username: string, pass: string): Promise<User> {
      const user = await this.userService.findByUsername(username);
      if (!(await this.passwordService.comparePasswords(pass, user.password)))
         throw new UnauthorizedException('Invalid credentials');
      return user;
   }

   async login(dto: LoginDto): Promise<{ access_token: string }> {
      const user = await this.validateUser(dto.username, dto.password);
      const payload = { id: user.id, username: user.username };
      return {
         access_token: this.jwtService.sign(payload, { secret: process.env.JWT_SECRET_KEY }),
      };
   }

   async singin(dto: SignInDto): Promise<{ access_token: string }> {
      const user = await this.userService.createUser(dto);
      const payload = { id: user.id, username: user.username };
      return {
         access_token: this.jwtService.sign(payload, { secret: process.env.JWT_SECRET_KEY }),
      };
   }
}
