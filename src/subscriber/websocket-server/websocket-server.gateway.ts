import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { WebsocketClientService } from '@subscriber/websocket-client/services/websocket-client.service';
import { CreateWebsocketClientDto } from '@subscriber/websocket-client/dto/create-websocket-client.dto';

@WebSocketGateway(2000, { cors: { origin: '*' } })
export class WebSocketServerGateway implements OnGatewayConnection, OnGatewayDisconnect {
   private readonly logger = new Logger(WebSocketServerGateway.name);
   @WebSocketServer() public server: Server;

   constructor(private readonly websocketClientService: WebsocketClientService) { }

   public async handleConnection(client: Socket) {
      this.logger.log(`[WEBSOCKET-SERVER]: Socket client ${client.id} conectado`);

      const websocketClient = new CreateWebsocketClientDto();
      websocketClient.clientID = client.id;
      await this.websocketClientService.createWebsocketClient(websocketClient);
   }

   public handleDisconnect(client: Socket) {
      this.logger.log(`Socket client ${client.id} desconectado`);
   }

   @SubscribeMessage('message')
   public handleMessage<T>(client: Socket, payload: T): void {
      this.logger.log(`Messagem ${JSON.stringify(payload)} do socket client: ${client.id}`);
   }
}
