import { Component } from '@angular/core';

@Component({
  selector: 'app-componente2',
  standalone: true,
  imports: [],
  templateUrl: './componente2.component.html',
  styleUrl: './componente2.component.css'
})
export class Componente2Component {
  playerName: string = 'njeslon'; // Puedes cambiar esto según la lógica que uses
  gameCode: string = 'T8HYKX'; // Esto debería generarse dinámicamente

  copyCode() {
    navigator.clipboard.writeText(this.gameCode).then(() => {
      alert('¡Código copiado!');
    }).catch(err => {
      console.error('Error al copiar el código: ', err);
    });
  }
}
