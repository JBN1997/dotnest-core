import { BaseRepository } from '@common/repositories/base.repository';
import { UserLog } from '@models/entities/user-log.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserLogRepository extends BaseRepository<UserLog> {
   constructor(
      @InjectRepository(UserLog)
      protected readonly userLogRepository: Repository<UserLog>,
   ) {
      super(userLogRepository);
   }

   establishAllRelationships(): UserLogRepository {
      this.relations = ['version', 'main'];
      return this;
   }
}
