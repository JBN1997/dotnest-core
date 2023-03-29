import { Module } from '@nestjs/common';
import { WebSocketServerGateway } from '@subscriber/websocket-server/websocket-server.gateway';

@Module({
   imports: [],
   controllers: [],
   providers: [WebSocketServerGateway],
   exports: [],
})
export class SubscriberModule {}
