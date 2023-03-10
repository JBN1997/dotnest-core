import { Controller, Get } from '@nestjs/common';
import { UserService } from '@models/users/services/user.service';

@Controller('users')
export class UsersController {
   constructor(private readonly userService: UserService) {}

   @Get()
   async findAll() {
      const users = await this.userService.findAll();
      return users;
   }
}
