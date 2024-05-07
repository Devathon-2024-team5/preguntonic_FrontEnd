import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from '../home/home.component';
import { Store } from '@ngrx/store';
import { GAME_ACTIONS } from '../../store/game/game.actions';
import { CustomButtonComponent } from '../../shared/components/custom-btn/custom-button.component';

@Component({
  selector: 'app-room-configuration',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, HomeComponent, CustomButtonComponent],
  templateUrl: './room-configuration.component.html',
  styleUrl: './room-configuration.component.css',
})
export class RoomConfigurationComponent {
  private readonly store = inject(Store);
  code = '';

  valuesNumberOfPlayers = [2, 3, 4, 5, 6, 7, 8];
  valuesNumberOfQuestions = [5, 10, 15, 20, 25, 30];
  numberOfPlayersInTheRoom: number = this.valuesNumberOfPlayers[0];
  numberOfGameQuestions: number = this.valuesNumberOfQuestions[0];

  createRoom() {
    this.store.dispatch(
      GAME_ACTIONS.setConfigGame({
        maxPlayers: this.numberOfPlayersInTheRoom,
        numOfQuestions: this.numberOfGameQuestions,
      })
    );
  }
}
