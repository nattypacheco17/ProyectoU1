import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GameCodeComponent } from '../game-code/game-code.component';

@Component({
  selector: 'app-sala-espera',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule, GameCodeComponent],
  templateUrl: './sala-espera.component.html',
  styleUrl: './sala-espera.component.css'
})

export class SalaEsperaComponent {
  playerName: string = '';

  // Método para manejar los datos recibidos
  onFormSubmitted(data: { name: string}) {
    this.playerName = data.name;
  }


  showInstructions() {
    throw new Error('Metodo no impelmentado.');
  }

}



