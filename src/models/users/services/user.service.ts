import { Injectable } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@models/users/entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { PasswordService } from 'src/authentication/services/password.service';

@Injectable()
export class UserService {
   constructor(
      @InjectRepository(User)
      protected readonly userRepository: Repository<User>,
      protected readonly passwordService: PasswordService,
   ) {}

   async findAll(): Promise<User[]> {
      return await this.userRepository.find();
   }

   async findByUsername(username: string): Promise<User> {
      return await this.userRepository.findOne({
         where: { username },
      });
   }

   async createUser(dto: DeepPartial<CreateUserDto>): Promise<User> {
      const user = await this.userRepository.create();
      user.username = dto.username;
      user.email = dto.email;
      user.password = await this.passwordService.hashPassword(dto.password);

      await this.userRepository.save(user);
      return user;
   }
}
