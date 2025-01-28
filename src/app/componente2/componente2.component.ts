import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PlayerNameNumberComponent } from '../player-name-number/player-name-number.component';
import { AvatarSelectorComponent } from '../avatar-selector/avatar-selector.component';
import { InstructionsComponent } from '../instructions/instructions.component';

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

    // Función para seleccionar un avatar aleatorio
    selectRandomAvatar() {
      const randomIndex = Math.floor(Math.random() * this.avatars.length);
      this.selectedAvatar = this.avatars[randomIndex];
      this.avatarSelected.emit(this.selectedAvatar); // Emitir el avatar seleccionado
    }

    ngOnInit() {
      this.selectRandomAvatar(); // Selecciona un avatar aleatorio cuando el componente se inicializa
    }

  // Método para manejar los datos recibidos
  onFormSubmitted(data: { name: string; participants: string }) {
    this.playerName = data.name;
    this.participants = data.participants;
    this.showPlayerNameForm = false; // Cambiar al siguiente estado
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
    return code;
  }
}
