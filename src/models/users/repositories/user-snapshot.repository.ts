import { BaseRepository } from '@common/repositories/base.repository';
import { UserSnapshot } from '@models/entities/user-snapshot.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserSnapshotRepository extends BaseRepository<UserSnapshot> {
   constructor(
      @InjectRepository(UserSnapshot)
      protected readonly userVersionRepository: Repository<UserSnapshot>,
   ) {
      super(userVersionRepository);
   }

   establishAllRelationships(): UserSnapshotRepository {
      this.relations = ['prevVersion', 'mainEntity'];
      return this;
   }
}
