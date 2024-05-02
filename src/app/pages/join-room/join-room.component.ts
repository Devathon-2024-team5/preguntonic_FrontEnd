import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LogoTitleComponent } from '../../shared/components/logo-title/logo-title.component';
import { Store } from '@ngrx/store';
import { PLAYERS_SELECTS } from '../../store/players/players.selectors';
import { HttpService } from '../../core/services/http.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-join-room',
  standalone: true,
  imports: [FormsModule, LogoTitleComponent],
  templateUrl: './join-room.component.html',
  styleUrl: './join-room.component.css',
})
export class JoinRoomComponent {
  code = '';
  store = inject(Store);
  currentPlayer$ = this.store.select(PLAYERS_SELECTS.selectPlayersCurrent);

  constructor(private http: HttpService) {}

  joinRoom() {
    this.currentPlayer$.subscribe({
      next: player => {
        if (player === null) return

        this.http.connectRoom(this.code, player);
        //necesitamos redireccionar a anteRoom cuando la conexión este habilitada (200 OK)
      },
      error: (err: HttpErrorResponse) => console.log(err.message),
    });
  }
}
