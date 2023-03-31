import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '@common/repositories/base.repository';
import { WebsocketClientEntity } from '@subscriber/websocket-client/entities/websocket-client.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WebsocketClientRepository extends BaseRepository<WebsocketClientEntity> {
   constructor(
      @InjectRepository(WebsocketClientEntity)
      protected readonly userRepository: Repository<WebsocketClientEntity>,
   ) {
      super(userRepository);
   }

   establishAllRelationships(): BaseRepository<WebsocketClientEntity> {
      this.relations = [];
      return this;
   }
}
