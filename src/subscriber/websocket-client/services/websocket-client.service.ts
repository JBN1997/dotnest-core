import { Injectable } from '@nestjs/common';
import { WebsocketClientEntity } from '@subscriber/websocket-client/entities/websocket-client.entity';
import { WebsocketClientRepository } from '@subscriber/websocket-client/repositories/websocket-client.repository';
import { CreateWebsocketClientDto } from '@subscriber/websocket-client/dto/create-websocket-client.dto';
import { DeleteWebsocketClientDto } from '@subscriber/websocket-client/dto/delete-websocket-client.dto';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';

@Injectable()
export class WebsocketClientService {
   constructor(
      protected readonly websocketClientRepository: WebsocketClientRepository,
   ) { }

   async createWebsocketClient(dto: CreateWebsocketClientDto): Promise<WebsocketClientEntity> {
      if (!dto) throw new Error('Missing dto parameter in createWebsocketClient');

      return await this.websocketClientRepository.saveAsync({ clientID: dto.clientID });
   }

   async getWebsocketClientById(id: string): Promise<WebsocketClientEntity> {
      if (!id) throw new Error('Missing id parameter in getWebsocketClientById');

      return await this.websocketClientRepository.getAsync(id);
   }

   async deleteWebsocketClientById(id: string): Promise<boolean> {
      if (!id) throw new Error('Missing id parameter in deleteWebsocketClientById');

      const result: DeleteResult = await this.websocketClientRepository.deleteByIdAsync(id);
      return result?.affected > 0;
   }
}
