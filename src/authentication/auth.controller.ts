import { Body, Controller, Get, Post, Put, Request, UseGuards } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { SignInDto } from './dto/signin.dto';
import { AuthService } from './services/auth.service';

@Controller('auth')
export class AuthController {
   constructor(private readonly authService: AuthService) {}

   @Post('login')
   async login(@Body() dto: LoginDto): Promise<{ access_token: string }> {
      return await this.authService.login(dto);
   }

   @Post('signin')
   async singIn(@Body() dto: SignInDto): Promise<{ access_token: string }> {
      return await this.authService.singin(dto);
   }
}
