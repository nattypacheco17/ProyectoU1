import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-componente1',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './componente1.component.html',
  styleUrls: ['./componente1.component.css'],
})
export class Componente1Component {
  nombre: string = '';
  numJugadores: number = 2;
  jugadores = [
    { value: 2, label: '2 jugadores' },
    { value: 3, label: '3 jugadores' },
    { value: 4, label: '4 jugadores' },
    { value: 5, label: '5 jugadores' },
    { value: 6, label: '6 jugadores' },
  ];

  @Output() juegoCreado = new EventEmitter<{ nombre: string; numJugadores: number }>();

  crearJuego() {
    if (this.nombre.trim() === '') {
      alert('Por favor, ingresa tu nombre.');
      return;
    }
    this.juegoCreado.emit({
      nombre: this.nombre,
      numJugadores: this.numJugadores,
    });
  }

  unirseJuego() {
    console.log('Funcionalidad para unirse a un juego');
  }
}
