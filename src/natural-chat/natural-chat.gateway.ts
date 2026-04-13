import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { NaturalChatService } from './natural-chat.service';
import { JwtService } from '@nestjs/jwt';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: [
      /^http:\/\/localhost(:\d+)?$/,
      'https://osonpos.com',
      'https://admin.osonpos.com',
      'capacitor://localhost',
      'http://192.168.1.6',
      'https://app.osonpos.com',
      'https://dashboard.osonpos.com',
      'file://',
      'app://.',
      /^vscode-webview:\/\//,
    ],
  },
  namespace: 'chat',
  transports: ['websocket'],
})
export class NaturalChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(NaturalChatGateway.name);

  constructor(
    private readonly naturalChatService: NaturalChatService,
    private readonly jwtService: JwtService,
  ) { }

  async handleConnection(client: Socket) {
    try {
      const token =
        client.handshake.auth?.token ||
        client.handshake.headers.authorization?.split(' ')[1];
      if (!token) {
        this.logger.warn(
          `Client ${client.id} connected without token. Disconnecting.`,
        );
        client.disconnect();
        return;
      }
      const payload = this.jwtService.verify(token);
      client.data.user = payload;
      this.logger.log(`Client ${client.id} connected. User: ${payload.sub}`);
    } catch (e) {
      this.logger.error(
        `Connection error for client ${client.id}: ${e.message}`,
      );
      client.disconnect();
    }
  }

  @SubscribeMessage('joinSession')
  handleJoinSession(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { sessionId: string },
  ) {
    const room = `session_${data.sessionId}`;
    client.join(room);
    this.logger.log(`Client ${client.id} joined session room: ${room}`);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { sessionId: string; message: string },
  ) {
    const user = client.data.user;
    if (!user) {
      this.logger.warn(
        `Unauthorized sendMessage attempt from client ${client.id}`,
      );
      return;
    }
    const dbName = user.dbName;
    const employeeId = user.sub || user.id;

    this.logger.log(`Message from ${employeeId} for session ${data.sessionId}: ${data.message}`);

    try {
      const savedMessage = await this.naturalChatService.saveMessage(
        dbName,
        data.sessionId,
        employeeId,
        data.message,
      );

      this.logger.log(`Message saved with ID: ${savedMessage.id}. Broadcasting to room.`);

      const room = `session_${data.sessionId}`;
      this.server.to(room).emit('newMessage', savedMessage);
    } catch (error) {
      this.logger.error(`Failed to save or broadcast message: ${error.message}`);
    }
  }
}
