import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [RouterLink, CommonModule,FormsModule],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})

export class PrincipalComponent {
  participantOptions: number[] = [2, 3, 4, 5, 6]; // Opciones de participantes
  selectedParticipants: string = ''; // Opción seleccionada

  showNameInput = false;
  showGameOptions = false;
  playerName: string  = '';
  nameError: string = ''; // Mensaje de error de validación
  animationState = '';
  participantError: string = ''; // Mensaje de error para el número de participantes


  @Output() nameSaved = new EventEmitter<string>(); // Para emitir el nombre al Componente 2




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


  handleStart() {
    this.animationState = 'fadeIn';
    setTimeout(() => {
      this.showNameInput = true;
    }, 500); // Retrasa para permitir que la animación ocurra
  }

  saveName() {
    this.validateName();
    this.validateParticipants();
    if (!this.nameError && !this.participantError) {
      this.nameSaved.emit(this.playerName)
      console.log('Nombre del jugador:', this.playerName);
      console.log('Número de participantes:', this.selectedParticipants);
      // Solo ejecuta si no hay errores
      setTimeout(() => {
        this.showNameInput = false; // Oculta el cuadro de texto
        this.showGameOptions = true; // Muestra las opciones de juego
        this.animationState = 'fadeIn'; // Activa la animación
      }, 500); // Retardo de medio segundo para un efecto suave
    }
  }


}

