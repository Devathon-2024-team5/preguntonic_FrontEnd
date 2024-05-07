import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LogoTitleComponent } from '../../shared/components/logo-title/logo-title.component';
import { Store } from '@ngrx/store';
import { GAME_ACTIONS } from '../../store/game/game.actions';
import { CustomButtonComponent } from '../../shared/components/custom-btn/custom-button.component';
import { GAME_SELECTORS } from '../../store/game/game.selectors';
import { AsyncPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-join-room',
  standalone: true,
  imports: [FormsModule, LogoTitleComponent,CustomButtonComponent,AsyncPipe,NgClass],
  templateUrl: './join-room.component.html',
  styleUrl: './join-room.component.css',
})
export class JoinRoomComponent {
  private readonly store = inject(Store);
  code = '';
  error$ = this.store.select(GAME_SELECTORS.selectGameError);

  joinRoom() {
    this.store.dispatch(GAME_ACTIONS.setRoomCode({roomCode: this.code.trim()}))
  }
}
