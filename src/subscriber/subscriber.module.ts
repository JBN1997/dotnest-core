import { Module } from '@nestjs/common';
import { WebSocketServerGateway } from '@subscriber/websocket-server/websocket-server.gateway';
import { WebsocketClientModule } from '@subscriber/websocket-client/websocket-client.module';

@Module({
   imports: [WebsocketClientModule],
   controllers: [],
   providers: [WebSocketServerGateway],
   exports: [],
})
export class SubscriberModule {}
