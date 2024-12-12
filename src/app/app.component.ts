import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Componente2Component } from './componente2/componente2.component';
import { GameCodeComponent } from './game-code/game-code.component';
import { TablaComponent } from './tabla/tabla.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Componente2Component, GameCodeComponent, TablaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ProyectoU1';
}
