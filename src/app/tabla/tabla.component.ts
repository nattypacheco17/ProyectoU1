import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink]
})
export class TablaComponent implements OnInit {
  constructor(private router: Router) {}

  @Input() jugadores: string[] = [];
  @Output() puntosTotales = new EventEmitter<number[]>();

  filas: string[] = ['1/3', '2/3', '1/4', '2/4', '1/5', '2/5', 'Escalera'];
  puntos: number[][] = [
    Array(this.filas.length).fill(0),
    Array(this.filas.length).fill(0),
    Array(this.filas.length).fill(0)
  ];
  totales: number[] = [0, 0, 0];

  ngOnInit(): void {
    const modal = document.getElementById('modalPoker');
    const body = document.body;

    // Agregar clase para activar el efecto de desenfoque
    body.classList.add('modal-active');

    if (modal) {
      setTimeout(() => {
        modal.style.display = 'none'; // Oculta el modal después de 3 segundos
        body.classList.remove('modal-active'); // Remueve la clase para restaurar el fondo
      }, 2000);
    }
  }


  calcularTotal(jugador: number): void {
    this.totales[jugador] = this.puntos[jugador].reduce((a, b) => a + (b || 0), 0);
  }

  actualizarPuntos(jugador: number, indice: number, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const valor = inputElement.value;
    const numero = parseInt(valor, 10);

    if (isNaN(numero) || numero <= 0) {
      this.puntos[jugador][indice] = 0;
    } else {
      this.puntos[jugador][indice] = numero;
    }

    this.calcularTotal(jugador);
  }

  verGanadores(): void {
    this.router.navigate(['/componente5'], { state: { totales: this.totales, jugadores: this.jugadores } });
  }
}
