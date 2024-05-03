import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LogoTitleComponent } from '../../shared/components/logo-title/logo-title.component';
import { Store } from '@ngrx/store';
import { PLAYERS_SELECTS } from '../../store/players/players.selectors';
import { HttpService } from '../../core/services/http.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

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
  router = inject(Router)

  constructor(private http: HttpService) {}

  joinRoom() {
    this.currentPlayer$.subscribe({
      next: player => {
        if (player === null) return

        this.http.createPlayer(player, this.code).subscribe(({ ok, body }) => {
          console.log(ok , body);
          
          if (!ok) throw new Error('assas');
          console.log(body); //guardar Player_id
          this.router.navigate(['/anteroom'], {
            queryParams: {
              room_code: this.code,
            },
          });
        });
        //necesitamos redireccionar a anteRoom cuando la conexión este habilitada (200 OK)
      },
      error: (err: HttpErrorResponse) => console.log(err.message),
    });
  }
}
