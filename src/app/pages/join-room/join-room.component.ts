import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LogoTitleComponent } from '../../shared/components/logo-title/logo-title.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-join-room',
  standalone: true,
  imports: [FormsModule,LogoTitleComponent],
  templateUrl: './join-room.component.html',
  styleUrl: './join-room.component.css'
})
export class JoinRoomComponent {
  code = '';
  router = inject(Router);

  constructor() {}

  //TODO: We are assuming that the code is valid, please validate it before redirecting
  joinRoom() {
    const player = localStorage.getItem('player');
    console.log('Joining room with code:', this.code, 'Player:', player);
    if (this.code === '' || player === null) {
      console.log('Invalid code or player');
      alert('Por favor, ingresa un codigo de sala valido.');
      return;
    }
    localStorage.setItem('room_code', this.code);

    this.router.navigate(['/anteroom'], {
      queryParams: { room_code: this.code },
    });

  }
}
