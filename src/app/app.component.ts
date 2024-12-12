import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Componente2Component } from './componente2/componente2.component';
import { GameCodeComponent } from './game-code/game-code.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Componente2Component, GameCodeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ProyectoU1';
}
