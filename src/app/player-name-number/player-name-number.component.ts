import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-player-name-number',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './player-name-number.component.html',
  styleUrls: ['./player-name-number.component.css'] // Asegúrate de que esto esté en plural
})
export class PlayerNameNumberComponent {

  participantOptions: number[] = [2, 3, 4, 5, 6]; // Opciones de participantes
  selectedParticipants: string = ''; // Opción seleccionada
  playerName: string = '';
  nameError: string = ''; // Mensaje de error de validación
  participantError: string = ''; // Mensaje de error para el número de participantes

  @Output() formSubmitted = new EventEmitter<{name: string, participants: string}>(); // Emitir nombre y número de jugadores

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

  // Validar número de participantes
  validateParticipants() {
    if (!this.selectedParticipants) {
      this.participantError = 'Por favor elige un número de participantes.';
    } else {
      this.participantError = ''; // No hay error
    }
  }

  saveName() {
    this.validateName();
    this.validateParticipants();
    if (!this.nameError && !this.participantError) {
      // Emitir solo los datos necesarios
      this.formSubmitted.emit({
        name: this.playerName,
        participants: this.selectedParticipants
      });
    }
  }
  
}
