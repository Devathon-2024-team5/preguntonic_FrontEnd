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

export interface RoomPlayer {
  max_players: number;
  num_of_question: number;
  player_name: string;
  avatar_id: string;
}

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
  dataPlayer$: Observable<Pick<IPlayer, 'avatar' | 'name'>>;

  constructor(private route: ActivatedRoute) {
    this.dataPlayer$ = this.store.select(PLAYERS_SELECTS.selectPlayersCurrent);
  }

  createRoom() {
    this.dataPlayer$.subscribe({
      next: ({ avatar, name }) => {
        // Recibe el back
        const RoomPlayer: RoomPlayer = {
          max_players: this.numberOfPlayersInTheRoom,
          num_of_question: this.numberOfGameQuestions,
          player_name: name,
          avatar_id: avatar,
        };

        this.httpService
          .createRoom(RoomPlayer)
          .pipe(
            switchMap(({ body, ok }) => {
              console.log(body);

              if (!ok) throw new Error('assas');
              
              this.code = body['room_code'];
              return this.httpService.createPlayer(
                RoomPlayer,
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
