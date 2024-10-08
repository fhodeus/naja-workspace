import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
    MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
    namespace: 'signal',
    cors: {
        origin: '*', // Permite o CORS para testes, mas ajuste conforme necessário
    },
})
export class SignalingGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;

    private logger: Logger = new Logger('SignalingGateway');

    @SubscribeMessage('signal')
    handleSignal(@MessageBody() data: any) {
        console.log('Signal received:', data); // Log de sinal recebido
        this.server.emit('signal', data); // Repassa o sinal para todos os clientes
    }

    @SubscribeMessage('join-room')
    handleJoinRoom(client: any) {
        console.log('Client joined the room:', client.id);
        client.broadcast.emit('user-connected', client.id); // Notifica os outros clientes sobre a conexão
    }

    afterInit(_server: Server) {
        this.logger.log('WebSocket initialized');
    }

    handleConnection(client: Socket, ..._args: any[]) {
        this.logger.log(`Client connected: ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }
}
