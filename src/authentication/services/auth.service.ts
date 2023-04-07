import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@models/entities/user.entity';
import { UserService } from '@models/services/user.service';
import { LoginDto } from '@authentication/dto/login.dto';
import { SigninDto } from '@authentication/dto/signin.dto';
import { PasswordService } from '@authentication/services/password.service';
import { UserPayload } from '@authentication/interfaces/user-payload.interface';
import { AccessToken } from '@authentication/interfaces/access-token.interface';

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

   async login(dto: LoginDto): Promise<AccessToken> {
      const user: User = await this.validateUser(dto.username, dto.password);
      const payload: UserPayload = { id: user.id, username: user.username, role: user.lastVersion.role };
      const accessToken: AccessToken = {
         access_token: this.jwtService.sign(payload, { secret: process.env.JWT_SECRET_KEY }),
      };

      return accessToken;
   }

   async singin(dto: SigninDto): Promise<AccessToken> {
      const user: User = await this.userService.createUser(dto);
      const payload: UserPayload = { id: user.id, username: user.username, role: user.lastVersion.role };
      const accessToken: AccessToken = {
         access_token: this.jwtService.sign(payload, { secret: process.env.JWT_SECRET_KEY }),
      };

      return accessToken;
   }
}
