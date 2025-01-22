import { Component, Output, EventEmitter} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InstructionsComponent } from '../instructions/instructions.component';

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

  enviarNombre() {
    this.nombre.emit(this.nombreJugador);
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

  isValidCode(): boolean {
    return this.gameCode.length === 6;
  }
}