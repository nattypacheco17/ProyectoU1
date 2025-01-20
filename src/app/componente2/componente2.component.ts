import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PlayerNameNumberComponent } from '../player-name-number/player-name-number.component';

@Component({
  selector: 'app-componente2',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, PlayerNameNumberComponent],
  templateUrl: './componente2.component.html',
  styleUrls: ['./componente2.component.css']
})

export class Componente2Component {
  showPlayerNameForm: boolean = true; // Estado inicial
  playerName: string = '';
  participants: string = '';
  gameCode: string = this.generateGameCode();

  // Método para manejar los datos recibidos
  onFormSubmitted(data: { name: string; participants: string }) {
    this.playerName = data.name;
    this.participants = data.participants;
    this.showPlayerNameForm = false; // Cambiar al siguiente estado
  }

  showInstructions() {
    alert('Aquí van las instrucciones del juego.');
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
