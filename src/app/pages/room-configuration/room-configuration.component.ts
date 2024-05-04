import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../core/services/http.service';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { Store } from '@ngrx/store';
import { PLAYERS_SELECTS } from '../../store/players/players.selectors';
import { Observable, switchMap } from 'rxjs';
import { GameConfigDTO, PlayerDTO } from '../../store/types/store.dto';
import { GAME_ACTIONS } from '../../store/game/game.actions';

@Component({
  selector: 'app-room-configuration',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, HomeComponent],
  templateUrl: './room-configuration.component.html',
  styleUrl: './room-configuration.component.css',
})
export class RoomConfigurationComponent {
  private readonly httpService = inject(HttpService);
  private readonly router = inject(Router);
  private readonly store = inject(Store);
  code = '';

  valuesNumberOfPlayers = [2, 3, 4, 5, 6, 7, 8];
  valuesNumberOfQuestions = [5, 10, 15, 20, 25, 30];
  numberOfPlayersInTheRoom: number = this.valuesNumberOfPlayers[0];
  numberOfGameQuestions: number = this.valuesNumberOfQuestions[0];

  playerName: string = '';
  playerAvatar: string = '';
  dataPlayer$: Observable<PlayerDTO>;

  constructor() {
    this.dataPlayer$ = this.store.select(PLAYERS_SELECTS.selectPlayersCurrent);
  }

  createRoom() {
    this.store.dispatch(
      GAME_ACTIONS.setConfigGame({
        maxPlayers: this.numberOfPlayersInTheRoom,
        numOfQuestion: this.numberOfGameQuestions,
      })
    );

    // this.dataPlayer$.subscribe({
    //   next: ({ avatar, playerName }) => {
    //     // Recibe el back
    //     const roomConfig: GameConfigDTO = {
    //       maxPlayers: this.numberOfPlayersInTheRoom,
    //       numOfQuestion: this.numberOfGameQuestions,
    //     };
    //     const player: PlayerDTO = { avatar, playerName };

    //     this.httpService
    //       .createRoom(roomConfig)
    //       .pipe(
    //         switchMap(({ ok, statusText, body }) => {
    //           if (!ok)
    //             throw new Error(`Failure to retrieve data: ${statusText}`);

    //           this.code = body['room_code'];
    //           return this.httpService.createPlayer(player, body['room_code']);
    //         })
    //       )
    //       .subscribe(({ ok, statusText }) => {
    //         if (!ok) throw new Error(`Failure to retrieve data: ${statusText}`);

    //         this.router.navigate(['/anteroom'], {
    //           queryParams: {
    //             room_code: this.code,
    //           },
    //         });
    //       });
    //   },
    // });
  }
}
