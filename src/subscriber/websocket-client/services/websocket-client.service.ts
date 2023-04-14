import { Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { WebsocketClientEntity } from '@subscriber/websocket-client/entities/websocket-client.entity';
import { WebsocketClientRepository } from '@subscriber/websocket-client/repositories/websocket-client.repository';
import { CreateWebsocketClientDto } from '@subscriber/websocket-client/dto/create-websocket-client.dto';

@Injectable()
export class WebsocketClientService {
   constructor(
      protected readonly websocketClientRepository: WebsocketClientRepository,
   ) { }

   async createWebsocketClient(dto: CreateWebsocketClientDto): Promise<WebsocketClientEntity> {
      if (!dto) throw new Error('Missing dto parameter in createWebsocketClient');

      return await this.websocketClientRepository.saveAsync({ clientID: dto.clientID });
   }
}
