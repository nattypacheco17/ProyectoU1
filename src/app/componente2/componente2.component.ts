import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PlayerNameNumberComponent } from '../player-name-number/player-name-number.component';
import { AvatarSelectorComponent } from '../avatar-selector/avatar-selector.component';
import { InstructionsComponent } from '../instructions/instructions.component';
import { SocketService } from '../service-socket.service'; // Importar el servicio de sockets
import { Router } from '@angular/router';


@Component({
  selector: 'app-componente2',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, PlayerNameNumberComponent, AvatarSelectorComponent, InstructionsComponent],
  templateUrl: './componente2.component.html',
  styleUrls: ['./componente2.component.css']
})

export class Componente2Component {
  showInstructions = false;
  showPlayerNameForm: boolean = true; // Estado inicial
  playerName: string = '';
  participants: string = '';
  gameCode: string = this.generateGameCode();
  selectedAvatar: string = '';
  avatars: string[] = [
    'avatar1.jpg', 'avatar2.jpg', 'avatar3.jpg',
    'avatar4.jpg', 'avatar5.jpg', 'avatar6.jpg'
  ];

  @Output() avatarSelected = new EventEmitter<string>(); // Emitir el avatar seleccionado
  constructor(private socketService: SocketService,  private router: Router) { } // Inyectar el servicio de sockets

  // Función para seleccionar un avatar aleatorio
  selectRandomAvatar() {
    const randomIndex = Math.floor(Math.random() * this.avatars.length);
    this.selectedAvatar = this.avatars[randomIndex];
    this.avatarSelected.emit(this.selectedAvatar); // Emitir el avatar seleccionado
  }

  ngOnInit(): void {
    this.selectRandomAvatar(); // Selecciona un avatar aleatorio cuando el componente se inicializa

    // Suscribirse a eventos cuando un jugador se une
    this.socketService.onPlayerJoined((playerData: any) => {
      console.log('Nuevo jugador se ha unido:', playerData);
      // Actualiza la UI con los datos del nuevo jugador
    });
  }

  // Método para manejar los datos recibidos
  onFormSubmitted(data: { name: string; participants: string }) {
    this.playerName = data.name;
    this.participants = data.participants;
    this.showPlayerNameForm = false;
    console.log('Intentando unirse a la sala con código:', this.gameCode); // Log para verificar
    this.socketService.joinRoom(this.gameCode, this.playerName);
  }


  onAvatarSelected(avatar: string) {
    this.selectedAvatar = avatar; // Guardar el avatar seleccionado
  }

  toggleInstructions() {
    this.showInstructions = !this.showInstructions;
  }

  // Función para copiar el código
  copyCode() {
    navigator.clipboard.writeText(this.gameCode).then(() => {
      alert('¡Código copiado!');
    }).catch(err => {
      console.error('Error al copiar el código: ', err);
    });
  }

  // Función para generar el código de juego aleatorio
  generateGameCode(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@$&';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    console.log('Código de sala generado:', code); // Log para verificar el código
    return code;
  }


  // Método para iniciar el juego
  startGame() {
    console.log('Iniciando el juego con el código:', this.gameCode); // Verificar el código antes de enviarlo
    this.socketService.startGame(this.gameCode); // Notificar al servidor que el juego comienza
    this.router.navigate(['/tabla']);

  }

  ngOnDestroy(): void {
    // Desconectar el socket cuando el componente sea destruido
    this.socketService.disconnect();
  }
}
