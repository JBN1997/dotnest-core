import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@models/users/entities/user.entity';

@Injectable()
export class UserService {
   constructor(
      @InjectRepository(User)
      protected readonly userRepository: Repository<User>,
   ) {}

   async findAll(): Promise<User[]> {
      return await this.userRepository.find();
   }

   async findByUsername(username: string): Promise<User> {
      return await this.userRepository.findOne({
         where: { username },
      });
   }
}
