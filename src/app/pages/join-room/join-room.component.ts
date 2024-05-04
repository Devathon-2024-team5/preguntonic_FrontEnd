import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LogoTitleComponent } from '../../shared/components/logo-title/logo-title.component';
import { Store } from '@ngrx/store';
import { PLAYERS_SELECTS } from '../../store/players/players.selectors';
import { GAME_ACTIONS } from '../../store/game/game.actions';

@Component({
  selector: 'app-join-room',
  standalone: true,
  imports: [FormsModule, LogoTitleComponent],
  templateUrl: './join-room.component.html',
  styleUrl: './join-room.component.css',
})
export class JoinRoomComponent {
  private readonly store = inject(Store);
  currentPlayer$ = this.store.select(PLAYERS_SELECTS.selectPlayersCurrent);
  code = '';

  joinRoom() {
    this.store.dispatch(GAME_ACTIONS.setRoomCode({roomCode: this.code}))
  }
}
