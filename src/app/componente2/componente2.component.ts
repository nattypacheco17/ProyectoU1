import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-componente2',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './componente2.component.html',
  styleUrls: ['./componente2.component.css']
})
export class Componente2Component {
showInstructions() {
throw new Error('Method not implemented.');
}
  playerName: string = 'njeslon'; // Puedes cambiar esto según la lógica que uses
  gameCode: string = this.generateGameCode(); // Generar código aleatorio al cargar el componente

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
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  }

}
