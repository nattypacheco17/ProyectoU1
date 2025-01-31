import { Component, Output, EventEmitter} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InstructionsComponent } from '../instructions/instructions.component';
import { SocketService } from '../service-socket.service'; // Importar el servicio de sockets
import { Router } from '@angular/router';
import Swal from 'sweetalert2'; // Para mostrar modales
@Component({
  selector: 'app-game-code',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule, InstructionsComponent],
  templateUrl: './game-code.component.html',
  styleUrls: ['./game-code.component.scss'],
})
export class GameCodeComponent {

  gameCode: string = '';
  characterCount: number = 0;
  nameError: string = '';
  nombreJugador: string = '';
  showInstructions = false;
  showWaitingModal = false; // Controlar la visibilidad del modal de espera


  @Output() nombre = new EventEmitter<string>();
  @Output() codigoSala = new EventEmitter<string>();
  constructor(private socketService: SocketService,  private router: Router) { } // Inyectar el servicio de sockets


  enviarNombre() {
    if (!this.nombreJugador || !this.gameCode) {
      Swal.fire('Error', 'Por favor ingresa tu nombre y el código de la sala.', 'error');
      return;
    }

    // Emitir los datos del jugador
    this.nombre.emit(this.nombreJugador);
    this.codigoSala.emit(this.gameCode);

    // Unirse a la sala
    this.socketService.joinRoom(this.gameCode, this.nombreJugador);

    // Mostrar el modal de espera
    this.showWaitingModal = true;

    // Escuchar cuando el juego comienza
    this.socketService.onGameStart().subscribe(() => {
      Swal.fire('¡El juego ha comenzado!', '', 'success').then(() => {
        this.router.navigate(['/tabla']);
      });
    });
  }

  validateName() {
    // Validación para el nombre
    if (!this.nombreJugador) {
      this.nameError = 'Por favor ingresa tu nombre.';
    } else if (this.nombreJugador.length < 3) {
      this.nameError = 'El nombre debe tener al menos 3 caracteres.';
    } else {
      this.nameError = ''; // No hay errores
    }
  }

  toggleInstructions() {
    this.showInstructions = !this.showInstructions;
  }

  updateCharacterCount(): void {
    this.characterCount = this.gameCode.length;
  }
  emitirCodigoSala() {
    this.codigoSala.emit(this.gameCode);
  }

  isValidCode(): boolean {
    return this.gameCode.length === 6;
  }
}
