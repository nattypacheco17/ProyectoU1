import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-avatar-selector',
  standalone: true,
  imports: [],
  templateUrl: './avatar-selector.component.html',
  styleUrl: './avatar-selector.component.css'
})
export class AvatarSelectorComponent {
  // Lista de los avatares disponibles
  avatars: string[] = [
    'avatar1.jpg', 'avatar2.jpg', 'avatar3.jpg',
    'avatar4.jpg', 'avatar5.jpg', 'avatar6.jpg'
  ];

  selectedAvatar: string = '';

  @Output() avatarSelected = new EventEmitter<string>(); // Emitir el avatar seleccionado

  // Función para seleccionar un avatar aleatorio
  selectRandomAvatar() {
    const randomIndex = Math.floor(Math.random() * this.avatars.length);
    this.selectedAvatar = this.avatars[randomIndex];
    this.avatarSelected.emit(this.selectedAvatar); // Emitir el avatar seleccionado
  }

  ngOnInit() {
    this.selectRandomAvatar(); // Selecciona un avatar aleatorio cuando el componente se inicializa
  }
}

