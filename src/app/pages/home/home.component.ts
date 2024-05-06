import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LogoTitleComponent } from '../../shared/components/logo-title/logo-title.component';
import { CustomButtonComponent } from '../../shared/components/custom-btn/custom-button.component';
import { Store } from '@ngrx/store';
import { CURRENT_PLAYER_ACTIONS } from '../../store/current-player/current-player.action';
import { GAME_ACTIONS } from '../../store/game/game.actions';
import { FormsModule } from '@angular/forms';
import { TimerComponent } from '../../components/timer/timer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './home.component.css',
  imports: [
    CustomButtonComponent,
    LogoTitleComponent,
    FormsModule,
    TimerComponent
  ],
})
export class HomeComponent {
  private store = inject(Store);

  avatarImages: string[] = [
    'assets/avatar-1.webp',
    'assets/avatar-2.webp',
    'assets/avatar-3.webp',
    'assets/avatar-4.webp',
  ];
  selectedAvatar: string = '';
  playerName: string = '';

  selectAvatar(avatar: string) {
    this.selectedAvatar = avatar;
  }

  public navigateView(route: Required<string>): void {
    if (!this.playerName.trim()) return alert('Por favor, ingresa un nombre');

    this.savePlayer();
    this.store.dispatch(GAME_ACTIONS.changeView({ route }));
  }

  private savePlayer(): void {
    this.store.dispatch(
      CURRENT_PLAYER_ACTIONS.saveCurrentPlayer({
        avatar: this.selectedAvatar,
        playerName: this.playerName,
      })
    );
  }
}
