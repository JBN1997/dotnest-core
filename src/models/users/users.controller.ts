import { ProtectedController } from '@common/controllers/protected.controller';
import { Controller, Get } from '@nestjs/common';
import { UserService } from './services/user.service';

@Controller('users')
export class UsersController extends ProtectedController {
   constructor(private readonly userService: UserService) {
      super();
   }

   @Get()
   async findAll() {
      const users = await this.userService.findAll();
      return users;
   }
}
