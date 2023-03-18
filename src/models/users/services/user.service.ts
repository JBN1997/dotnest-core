import { Injectable } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@models/users/entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { PasswordService } from 'src/authentication/services/password.service';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
   constructor(
      protected readonly userRepository: UserRepository,
      protected readonly passwordService: PasswordService,
   ) {}

   async count(): Promise<number> {
      return await this.userRepository.countAsync();
   }

   async findAll(): Promise<User[]> {
      return await this.userRepository.getAllAsync();
   }

   async findByUsername(username: string): Promise<User> {
      return await this.userRepository.getByAsync({ username });
   }

   async createUser(dto: DeepPartial<CreateUserDto>): Promise<User> {
      const hashedPassword = await this.passwordService.hashPassword(dto.password);
      const user = await this.userRepository.saveAsync({
         username: dto.username,
         email: dto.email,
         password: hashedPassword,
      });
      return user;
   }
}
