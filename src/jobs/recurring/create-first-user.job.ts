import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { CreateUserDto } from '@models/users/dto/create-user.dto';
import { UserService } from '@models/users/services/user.service';

@Injectable()
export class CreateUserJob implements OnApplicationBootstrap {
   constructor(private readonly userService: UserService) {}
   private readonly logger = new Logger(CreateUserJob.name);

   async onApplicationBootstrap() {
      const firstUser = new CreateUserDto();
      firstUser.email = 'root@root.com';
      firstUser.password = 'root';
      firstUser.name = 'admin';
      firstUser.username = 'root';

      if (!(await this.userService.count())) {
         await this.userService.createUser(firstUser);
         this.logger.debug('User created with success!');
      }
   }
}
