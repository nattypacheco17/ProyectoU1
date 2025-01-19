import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-sala-espera',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './sala-espera.component.html',
  styleUrl: './sala-espera.component.css'
})
export class SalaEsperaComponent {
  gameCode: string = '';
  characterCount: number = 0;
  playerName: string = '';
  nameError: string = ''; // Mensaje de error de validación

  @Output() formSubmitted = new EventEmitter<{name: string}>();

  validateName() {
    // Validación para el nombre
    if (!this.playerName) {
      this.nameError = 'Por favor ingresa tu nombre.';
    } else if (this.playerName.length < 3) {
      this.nameError = 'El nombre debe tener al menos 3 caracteres.';
    } else {
      this.nameError = ''; // No hay errores
    }
  }

  showInstructions() {
    throw new Error('Metodo no impelmentado.');
  }
  updateCharacterCount(): void {
    this.characterCount = this.gameCode.length;
  }
  isValidCode(): boolean {
    return this.gameCode.length === 6;
  }

  saveName() {
    this.validateName();
    this.isValidCode();
    if (!this.nameError && !this.isValidCode) {
      // Emitir solo los datos necesarios
      this.formSubmitted.emit({
        name: this.playerName
            });
    }
  }
}



