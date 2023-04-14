import { Body, Controller, Post } from '@nestjs/common';
import { PublicController } from '@common/controllers/public.controller';
import { LoginDto } from '@authentication/dto/login.dto';
import { SigninDto } from '@authentication/dto/signin.dto';
import { AuthService } from '@authentication/services/auth.service';
import { AccessToken } from '@authentication/interfaces/access-token.interface';

@Controller('auth')
export class AuthController extends PublicController {
   constructor(private readonly authService: AuthService) {
      super();
   }

   @Post('login')
   async login(@Body() dto: LoginDto): Promise<AccessToken> {
      return await this.authService.login(dto);
   }

   @Post('signin')
   async singIn(@Body() dto: SigninDto): Promise<AccessToken> {
      return await this.authService.singin(dto);
   }
}
