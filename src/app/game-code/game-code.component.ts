import { Component, Output, EventEmitter} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2'; // Instalar en la consola con npm install sweetalert2 e importar en el componente

@Component({
  selector: 'app-game-code',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './game-code.component.html',
  styleUrls: ['./game-code.component.scss'],
})
export class GameCodeComponent {
  gameCode: string = '';
  characterCount: number = 0;
  nameError: string = '';
  nombreJugador: string = '';

  @Output() nombre = new EventEmitter<string>();

  enviarNombre() {
    this.nombre.emit(this.nombreJugador);
  }

  validateName() {
    // Validación para el nombre
    if (!this.nombreJugador) {
      this.nameError = 'Por favor ingresa tu nombre.';
    } else if (this.nombreJugador.length < 3) {
      this.nameError = 'El nombre debe tener al menos 3 caracteres.';
    } else {
      this.nameError = ''; // No hay errores
    }
  }

  showInstructions() {
    Swal.fire({
      title: "Reglas del juego Telefunken",
      html: `
        <div style="text-align: justify;">
          <p style="margin-bottom: 5px;"><strong>1.</strong> El juego consta de 7 rondas, cada una con un objetivo específico para "bajarse" (mostrar combinaciones).</p>
          <p style="margin-bottom: 5px;"><strong>2.</strong> Se utilizan 2 barajas estándar (108 cartas). Los comodines y los doses actúan como comodines.</p>
          <p style="margin-bottom: 5px;"><strong>3.</strong> En cada turno, toma una carta del mazo o del montón de descartes y descarta una.</p>
          <p style="margin-bottom: 5px;"><strong>4.</strong> Objetivo por rondas:</p>
          <ul style="margin-left: 25px;">
            <li>Ronda 1: Un trío (3 cartas del mismo valor).</li>
            <li>Ronda 2: Dos tríos.</li>
            <li>Ronda 3: Un cuarteto (4 cartas del mismo valor).</li>
            <li>Ronda 4: Dos cuartetos.</li>
            <li>Ronda 5: Un quinteto (5 cartas del mismo valor).</li>
            <li>Ronda 6: Dos quintetos.</li>
            <li style="margin-bottom: 5px;">Ronda 7: Una escalera de 7 o más cartas consecutivas del mismo palo.</li>
          </ul>
          <p style="margin-bottom: 5px;"><strong>5.</strong> Minimiza los puntos acumulados al final del juego:</p>
          <ul style="margin-left: 25px;">
            <li>Cartas del 2 al 9: 5 puntos.</li>
            <li>Cartas del 10 al K: 10 puntos.</li>
            <li>Ases: 15 puntos.</li>
            <li style="margin-bottom: 5px;">Comodines: 20 puntos.</li>
          </ul>
          <p style="text-align: center;">¡Diviértete jugando Telefunken!</p>
        </div>
      `,
      icon: "info"
    });   
  }
  updateCharacterCount(): void {
    this.characterCount = this.gameCode.length;
  }
  isValidCode(): boolean {
    return this.gameCode.length === 6;
  }
}
