import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { LogoTitleComponent } from '../../shared/components/logo-title/logo-title.component';
import { CustomButtonComponent } from '../../shared/components/custom-btn/custom-button.component';
import { Store } from '@ngrx/store';
import { CURRENT_PLAYER_ACTIONS } from '../../store/current-player/current-player.action';
import { GAME_ACTIONS } from '../../store/game/game.actions';
import { FormsModule } from '@angular/forms';
import { TimerComponent } from '../../components/timer/timer.component';
import { AvatarWithFrameComponent } from '../../shared/components/avatar-with-frame/avatar-with-frame.component';
import { InfoIconButtonComponent } from '../../components/info-icon-button/info-icon-button.component';
import { ChangeIconButtonComponent } from '../../components/change-icon-button/change-icon-button.component';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { AvatarService } from '../../core/services/avatar.service';

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
    TimerComponent,
    AvatarWithFrameComponent,
    InfoIconButtonComponent,
    ChangeIconButtonComponent,
    ModalComponent
  ],
})
export class HomeComponent{
  private store = inject(Store);
  
  avatars;
  currentAvatar: string = ''; // Avatar currently selected in modal component
  selectedAvatar: string = ''; // Avatar selected
  playerName: string = '';
  stateModal = signal(false);

  constructor(private avatarService: AvatarService) {
    this.avatars = this.avatarService.getAllAvatars();
  }

  openModal(event: MouseEvent) {
    event.preventDefault();
    this.stateModal.update(()=>true);
  }

  selectAvatar(){
    this.selectedAvatar = this.currentAvatar;
    this.stateModal.update(()=>false);
  }

  public navigateView(route: Required<string>): void {
    if (!this.selectedAvatar) return alert('Por favor, selecciona un avatar');
    else if (!this.playerName.trim()) return alert('Por favor, ingresa un nombre');

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
