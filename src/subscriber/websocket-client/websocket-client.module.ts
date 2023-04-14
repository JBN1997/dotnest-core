import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebsocketClientService } from '@subscriber/websocket-client/services/websocket-client.service'
import { WebsocketClientEntity } from '@subscriber/websocket-client/entities/websocket-client.entity';
import { WebsocketClientRepository } from '@subscriber/websocket-client/repositories/websocket-client.repository';

@Module({
   imports: [TypeOrmModule.forFeature([WebsocketClientEntity])],
   controllers: [],
   providers: [WebsocketClientService, WebsocketClientRepository],
   exports: [WebsocketClientService],
})
export class WebsocketClientModule {}
