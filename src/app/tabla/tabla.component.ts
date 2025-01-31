import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SocketService } from '../service-socket.service';
@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink]
})
export class TablaComponent implements OnInit {
  jugadores: string[] = [];
  cantidad: number = 0;

  filas: string[] = ['1/3', '2/3', '1/4', '2/4', '1/5', '2/5', 'Escalera'];
  puntos: number[][] = [];
  totales: number[] = [];
  mostrarModal: boolean = true; // Inicialmente el modal está visible


  constructor(private router: Router, private socketService: SocketService) { }

  ngOnInit(): void {
    const playerData = this.socketService.getPlayerData();

    // Inicializar jugadores y cantidad
    this.jugadores = Array(playerData.participants)
    .fill('Jugador')
    .map((_, index) => `Jugador ${index + 1}`); // Nombres de jugadores
  this.cantidad = playerData.participants; // Cantidad de jugadores

    // Inicializar matriz de puntos
    this.puntos = Array(this.cantidad)
    .fill(null)
    .map(() => Array(this.filas.length).fill(0));
  this.totales = Array(this.cantidad).fill(0);

    // Cerrar el modal después de 3 segundos
    setTimeout(() => {
      this.mostrarModal = false;
    }, 2000);

  // Escuchar actualizaciones de la tabla
  this.socketService.onTableUpdate().subscribe((updatedData: any) => {
    this.puntos = updatedData.puntos;
    this.totales = updatedData.totales;
  });
  }

  calcularTotal(jugador: number): void {
    this.totales[jugador] = this.puntos[jugador].reduce((a, b) => a + (b || 0), 0);
  }

  actualizarPuntos(jugadorIndex: number, filaIndex: number, event: any) {
    const valor = parseInt(event.target.value, 10) || 0;
    this.puntos[jugadorIndex][filaIndex] = valor;
    this.calcularTotales();

    // Enviar la actualización a la sala
    const gameCode = this.socketService.getCurrentRoomCode();
    this.socketService.updateTable(gameCode, { puntos: this.puntos, totales: this.totales });
  }

  calcularTotales() {
    this.totales = this.puntos.map(jugadorPuntos =>
      jugadorPuntos.reduce((acum, puntos) => acum + puntos, 0)
    );
  }


  showInstructions() {
    throw new Error('Method not implemented.');
  }

  verGanadores(): void {
    this.router.navigate(['/componente5'], { state: { totales: this.totales, jugadores: this.jugadores } });
  }
}
