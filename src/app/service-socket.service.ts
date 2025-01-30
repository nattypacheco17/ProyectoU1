import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;
  private playerData: { name: string; participants: number } = { name: '', participants: 0 };

  constructor() {
    // Inicializa el socket con la URL del servidor
    this.socket = io('http://localhost:3000');  // Cambia la URL por la de tu servidor
  }

  setPlayerData(name: string, participants: number) {
    this.playerData.name = name;
    this.playerData.participants = participants;
  }

  getPlayerData() {
    return this.playerData;
  }

  // Unirse a la tabla
  joinTable(tableId: string) {
    if (tableId) {
      this.socket.emit('joinTable', tableId);
    } else {
      console.error('❌ El ID de la tabla es obligatorio para unirse');
    }
  }

  // Unirse a la sala
  joinRoom(gameCode: string, playerName: string) {
    this.socket.emit('joinRoom', gameCode, playerName);
  }


    // Método para emitir eventos desde el cliente al servidor
    emitEvent(eventName: string, data: any): void {
      this.socket.emit(eventName, data);
    }

  // Iniciar el juego
  startGame(gameCode: string) {
    this.socket.emit('startGame', gameCode);

  }
  // Escuchar cuando un jugador se une
  onPlayerJoined(callback: (playerData: any) => void): void {
    this.socket.on('playerJoined', callback);
  }

  // Escuchar cuando el juego ha comenzado
  onGameStart(): Observable<void> {
    return new Observable((observer) => {
      this.socket.on('gameStarted', () => {
        observer.next();
      });

      // Limpieza de la suscripción
      return () => this.socket.off('gameStarted');
    });
  }

  // Escuchar las actualizaciones de la tabla
  onTableUpdate(): Observable<unknown> {
    return new Observable(observer => {
      this.socket.on('tableUpdated', (data: unknown) => observer.next(data));

      // Limpieza de la suscripción
      return () => this.socket.off('tableUpdated');
    });
  }


  // Enviar actualización a la tabla
  updateTable(tableId: string, updatedData: any) {
    if (tableId && updatedData) {
      this.socket.emit('updateTable', tableId, updatedData);
    } else {
      console.error('❌ El ID de la tabla y los datos actualizados son necesarios');
    }
  }

  // Obtener el código de sala actual (puedes implementarlo en base a la lógica de tu app)
  getCurrentRoomCode(): string {
    // Este es solo un ejemplo, puedes usar LocalStorage, servicios o un estado global
    return '';
  }

  // Manejo de errores de conexión
  private handleConnectionErrors() {
    this.socket.on('connect_error', (error: Error) => {
      console.error('Error de conexión:', error);
    });

    this.socket.on('reconnect_attempt', (attempt: number) => {
      console.log('Intento de reconexión número:', attempt);
    });

    this.socket.on('reconnect_failed', () => {
      console.error('❌ No se pudo reconectar al servidor');
    });
  }

  // Escuchar cuando una sala no es encontrada
  onRoomNotFound(): Observable<unknown> {
    return new Observable(observer => {
      this.socket.on('roomNotFound', (data: unknown) => observer.next(data));
    });
  }


  // Método para desconectar el socket cuando ya no sea necesario
  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

}
