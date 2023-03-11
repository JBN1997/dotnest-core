import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './services/auth.service';

@Controller('auth')
export class AuthController {
   constructor(private readonly authService: AuthService) {}

   @Post('login')
   async login(@Body() dto: LoginDto): Promise<{ access_token: string }> {
      return this.authService.login(dto);
   }
}
