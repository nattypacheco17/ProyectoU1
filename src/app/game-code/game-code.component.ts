import { Component, Output, EventEmitter} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InstructionsComponent } from '../instructions/instructions.component';
import { SocketService } from '../service-socket.service'; // Importar el servicio de sockets
import { Router } from '@angular/router';
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

  @Output() nombre = new EventEmitter<string>();
  @Output() codigoSala = new EventEmitter<string>();
  constructor(private socketService: SocketService,  private router: Router) { } // Inyectar el servicio de sockets


  enviarNombre() {
    this.nombre.emit(this.nombreJugador);
    this.codigoSala.emit(this.gameCode);

    // Guardar los datos en el servicio
    this.socketService.setPlayerData({
      name: this.nombreJugador,
      participants: 0, // Ajusta esto según tu lógica
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
