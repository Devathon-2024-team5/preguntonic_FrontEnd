import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../core/services/http.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { Store } from '@ngrx/store';
import { PLAYERS_SELECTS } from '../../store/players/players.selectors';
import { IPlayer } from '../../store/models/IPlayers.state';
import { Observable, switchMap } from 'rxjs';
import { IGameState } from '../../store/models/IGame.state';

@Component({
  selector: 'app-room-configuration',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, HomeComponent],
  templateUrl: './room-configuration.component.html',
  styleUrl: './room-configuration.component.css',
})
export class RoomConfigurationComponent {
  httpService = inject(HttpService);
  router = inject(Router);
  store = inject(Store);
  code = '';

  valuesNumberOfPlayers = [2, 3, 4, 5, 6, 7, 8];
  valuesNumberOfQuestions = [5, 10, 15, 20, 25, 30];
  numberOfPlayersInTheRoom: number = this.valuesNumberOfPlayers[0];
  numberOfGameQuestions: number = this.valuesNumberOfQuestions[0];

  playerName: string = '';
  playerAvatar: string = '';
  dataPlayer$: Observable<Pick<IPlayer, 'avatar' | 'playerName'>>;

  constructor(private route: ActivatedRoute) {
    this.dataPlayer$ = this.store.select(PLAYERS_SELECTS.selectPlayersCurrent);

  }

  createRoom() {
    this.dataPlayer$.subscribe({
      next: ({ avatar, playerName }) => {
        // Recibe el back
        const roomConfig: Pick<IGameState, 'maxPlayers' | 'numOfQuestion'> = {
          maxPlayers: this.numberOfPlayersInTheRoom,
          numOfQuestion: this.numberOfGameQuestions,
        };
        const player: Pick<IPlayer, 'avatar' | 'playerName'> = {
          avatar,
          playerName
        }

        this.httpService
          .createRoom(roomConfig)
          .pipe(
            switchMap(({ body, ok }) => {
              console.log(body);

              if (!ok) throw new Error('assas');
              
              this.code = body['room_code'];
              return this.httpService.createPlayer(
                player,
                body['room_code']
              );
            })
          )
          .subscribe(({ ok, body }) => {
            if (!ok) throw new Error('assas');
            console.log(body); //guardar Player_id
            this.router.navigate(['/anteroom'], {
              queryParams: {
                room_code: this.code,
              },
            });
          });
      },
    });
  }
}
