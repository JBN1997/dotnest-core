import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordService } from 'src/authentication/services/password.service';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './services/user.service';
import { UsersController } from './users.controller';

@Module({
   imports: [TypeOrmModule.forFeature([User])],
   controllers: [UsersController],
   providers: [UserService, PasswordService, UserRepository],
   exports: [UserService],
})
export class UsersModule {}
