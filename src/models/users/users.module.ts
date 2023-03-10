import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './services/user.service';
import { UsersController } from './users.controller';

@Module({
   imports: [TypeOrmModule.forFeature([User])],
   controllers: [UsersController],
   providers: [UserService],
   exports: [UserService],
})
export class UsersModule {}
