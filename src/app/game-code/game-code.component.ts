import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-game-code',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './game-code.component.html',
  styleUrls: ['./game-code.component.scss'],
})
export class GameCodeComponent {
  gameCode: string = '';
  characterCount: number = 0;

  updateCharacterCount(): void {
    this.characterCount = this.gameCode.length;
  }

  searchGame(): void {
    if (this.gameCode.length === 6) {
      console.log('Buscando juego con código:', this.gameCode);
    }
  }

  goBack(): void {
    console.log('Regresando..');
  }
}