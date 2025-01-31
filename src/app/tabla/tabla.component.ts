import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SocketService } from '../service-socket.service';
import { InstructionsComponent } from '../instructions/instructions.component';
import { AvatarSelectorComponent } from '../avatar-selector/avatar-selector.component';
import { Output, EventEmitter, OnDestroy } from '@angular/core';


@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, InstructionsComponent,AvatarSelectorComponent]
})
export class TablaComponent implements OnInit {
  jugadores: string[] = [];
  cantidad: number = 0;
  filas: string[] = ['1/3', '2/3', '1/4', '2/4', '1/5', '2/5', 'Escalera'];
  puntos: number[][] = [];
  totales: number[] = [];
  mostrarModal: boolean = true; // Inicialmente el modal está visible
  showInstructions: boolean = false;
  selectedAvatar: string = '';
 avatars: string[] = [
    'avatar1.jpg', 'avatar2.jpg', 'avatar3.jpg',
    'avatar4.jpg', 'avatar5.jpg', 'avatar6.jpg'
  ];
    @Output() avatarSelected = new EventEmitter<string>(); // Emitir el avatar seleccionado

  constructor(private router: Router, private socketService: SocketService) {}
  // Función para seleccionar un avatar aleatorio
  selectRandomAvatar() {
    const randomIndex = Math.floor(Math.random() * this.avatars.length);
    this.selectedAvatar = this.avatars[randomIndex];
    this.avatarSelected.emit(this.selectedAvatar); // Emitir el avatar seleccionado
  }

  onAvatarSelected(avatar: string) {
    this.selectedAvatar = avatar; // Guardar el avatar seleccionado
  }
  ngOnInit(): void {
    const playerData = this.socketService.getPlayerData();

    // Inicializar jugadores y cantidad
    this.jugadores = Array(playerData.participants)
      .fill('Jugador')
      .map((_, index) => `Jugador ${index + 1}`);
    this.cantidad = playerData.participants;

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

  actualizarPuntos(jugadorIndex: number, filaIndex: number, event: any): void {
    const valor = parseInt(event.target.value, 10) || 0;
    this.puntos[jugadorIndex][filaIndex] = valor;
    this.calcularTotales();

    // Enviar la actualización a la sala
    const gameCode = this.socketService.getCurrentRoomCode();
    this.socketService.updateTable(gameCode, { puntos: this.puntos, totales: this.totales });
  }

  calcularTotales(): void {
    this.totales = this.puntos.map(jugadorPuntos =>
      jugadorPuntos.reduce((acum, puntos) => acum + puntos, 0)
    );
  }

  toggleInstructions(): void {
    this.showInstructions = !this.showInstructions;
  }

  verGanadores(): void {
    this.router.navigate(['/componente5'], { state: { totales: this.totales, jugadores: this.jugadores } });
  }
}
