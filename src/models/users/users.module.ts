import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/authentication/auth.module';
import { PasswordService } from 'src/authentication/services/password.service';
import { User } from './entities/user.entity';
import { UserService } from './services/user.service';
import { UsersController } from './users.controller';

@Module({
   imports: [TypeOrmModule.forFeature([User])],
   controllers: [UsersController],
   providers: [UserService, PasswordService],
   exports: [UserService],
})
export class UsersModule {}
