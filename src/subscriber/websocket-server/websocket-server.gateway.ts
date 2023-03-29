import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(2000, { cors: { origin: '*' } })
export class WebSocketServerGateway implements OnGatewayConnection, OnGatewayDisconnect {
   private readonly logger = new Logger(WebSocketServerGateway.name);
   @WebSocketServer() public server: Server;

   public handleConnection(client: Socket) {
      this.logger.log(`Socket client ${client.id} conectado`);
   }

   public handleDisconnect(client: Socket) {
      this.logger.log(`Socket client ${client.id} desconectado`);
   }

   @SubscribeMessage('message')
   public handleMessage<T>(client: Socket, payload: T): void {
      this.logger.log(`Messagem ${JSON.stringify(payload)} do socket client: ${client.id}`);
   }
}
