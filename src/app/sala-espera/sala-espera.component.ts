import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GameCodeComponent } from '../game-code/game-code.component';
import Swal from 'sweetalert2'; // Instalar en la consola con npm install sweetalert2 e importar en el componente
import { InstructionsComponent } from '../instructions/instructions.component';
import { AvatarSelectorComponent } from '../avatar-selector/avatar-selector.component';


@Component({
  selector: 'app-sala-espera',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule, GameCodeComponent, InstructionsComponent, AvatarSelectorComponent],
  templateUrl: './sala-espera.component.html',
  styleUrl: './sala-espera.component.css'
})

export class SalaEsperaComponent  {
nombreRecibido: string = '';
playerName: string = '';
participants: string = '';
showPlayerNameForm: boolean = true;
showInstructions = false;
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


recibirNombre(nombreJugador: string) {
  this.nombreRecibido = nombreJugador;
  this.showPlayerNameForm = false;
}

  toggleInstructions() {
    this.showInstructions = !this.showInstructions;
  }
}
