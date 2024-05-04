import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LogoTitleComponent } from '../../shared/components/logo-title/logo-title.component';
import { AvatarImageComponent } from '../../shared/components/avatar-img/avatar-image.component';
import { CustomButtonComponent } from '../../shared/components/custom-btn/custom-button.component';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CURRENT_PLAYER_ACTIONS } from '../../store/current-player/current-player.action';
import { GAME_ACTIONS } from '../../store/game/game.actions';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './home.component.css',
  imports: [CustomButtonComponent, LogoTitleComponent, AvatarImageComponent],
})
export class HomeComponent {
  private readonly router = inject(Router);
  private store = inject(Store);

  avatarImages: string[] = [
    '../../../assets/avatar-1.webp',
    '../../../assets/avatar-2.webp',
    '../../../assets/avatar-3.webp',
    '../../../assets/avatar-4.webp',
  ];
  selectedAvatar: string = '';
  playerName: string = '';

  selectAvatar(avatar: string) {
    this.selectedAvatar = avatar;
  }

  onNameInputChange(event: Event) {
    if (!(event.target instanceof HTMLInputElement)) return;

    this.playerName = event.target.value;
  }

  public navigateView(route: Required<string>): void {
    if (!this.playerName.trim()) return alert('Por favor, ingresa un nombre');

    this.savePlayer();
    //this.router.navigate([route]);
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
