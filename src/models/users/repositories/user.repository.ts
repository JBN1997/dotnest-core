import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/common/repositories/base.repository';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository extends BaseRepository<User> {
   constructor(
      @InjectRepository(User)
      protected readonly userRepository: Repository<User>,
   ) {
      super(userRepository);
   }

   establishAllRelationships(): UserRepository {
      this.relations = [];
      return this;
   }
}
