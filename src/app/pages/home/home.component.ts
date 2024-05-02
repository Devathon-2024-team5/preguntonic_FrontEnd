import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LogoTitleComponent } from '../../shared/components/logo-title/logo-title.component';
import { AvatarImageComponent } from '../../shared/components/avatar-img/avatar-image.component';
import { CustomButtonComponent } from '../../shared/components/custom-btn/custom-button.component';
import { Router } from '@angular/router';
import { IPlayer } from '../../store/models/IPlayers.state';
import { Store } from '@ngrx/store';
import { PLAYERS_ACTIONS } from '../../store/players/players.actions';

// type Player = Pick<IPlayer, 'avatar' | 'name'>;

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './home.component.css',
  imports: [CustomButtonComponent, LogoTitleComponent, AvatarImageComponent],
})
export class HomeComponent {
  router = inject(Router);
  store = inject(Store);

  avatarImages: string[] = [
    '../../../assets/avatar-1.webp',
    '../../../assets/avatar-2.webp',
    '../../../assets/avatar-3.webp',
    '../../../assets/avatar-4.webp',
  ];
  selectedAvatar: string = '';
  playerName: string = '';

  constructor() {}

  selectAvatar(avatar: string) {
    this.selectedAvatar = avatar;
  }

  onNameInputChange(event: Event) {
    // Utiliza la interfaz HTMLInputElement para asegurar que event.target es un input element
    const inputElement = event.target as HTMLInputElement;
    this.playerName = inputElement.value;
  }

  createRoom() {
    this.saveDataPlayer(this.getDataPlayer());

    this.router.navigate(['/room-configuration']);
  }

  joinRoom() {
    this.saveDataPlayer(this.getDataPlayer());
    
    this.router.navigate(['/join-room']);
  }
  
  private saveDataPlayer(player: Pick<IPlayer, 'avatar' | 'name'>) {
    if (this.playerName.trim() === '') alert('Por favor, ingresa un nombre.');

    // guardar en el store
    this.store.dispatch(PLAYERS_ACTIONS.savePlayers(player));
  }

  private getDataPlayer(): Pick<IPlayer, 'avatar' | 'name'> {
    return {
      avatar: this.selectedAvatar,
      name: this.playerName,
    };
  }
}
