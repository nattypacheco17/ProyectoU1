import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-componente1',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './componente1.component.html',
  styleUrls: ['./componente1.component.css']

})
export class Componente1Component {
  nombre: string = '';
  numJugadores: number = 2; // Por defecto a 2 jugadores

  @Output() juegoCreado = new EventEmitter<{ nombre: string, numJugadores: number }>();

  crearJuego() {
    this.juegoCreado.emit({
      nombre: this.nombre,
      numJugadores: this.numJugadores
    });
  }

  unirseJuego() {
    console.log("Funcionalidad para unirse a un juego");
  }
}
