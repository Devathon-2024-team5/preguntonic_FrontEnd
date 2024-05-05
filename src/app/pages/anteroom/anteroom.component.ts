import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { HeaderAnteroomComponent } from './components/header-anteroom/header-anteroom.component';
import { CodeContainerComponent } from './components/code-container/code-container.component';
import { SectionPlayerComponent } from './components/section-player/section-player.component';
import { HomeComponent } from '../home/home.component';
import { HttpService } from '../../core/services/http.service';
import { CustomButtonComponent } from '../../shared/components/custom-btn/custom-button.component';
import { WebSocketApiService } from '../../core/services/web-socket-api.service';
import { PLAYERS_SELECTS } from '../../store/players/players.selectors';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { CURRENT_PLAYER_SELECTS } from '../../store/current-player/current-player.selectors';
import { GAME_ACTIONS } from '../../store/game/game.actions';
import { NumberOfReadyPipe } from '../../shared/pipes/number-of-ready.pipe';
import { GAME_SELECTORS } from '../../store/game/game.selectors';
import { FilterPlayersPipe } from '../../shared/pipes/filter-players.pipe';



@Component({
  selector: 'app-anteroom',
  standalone: true,
  templateUrl: './anteroom.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './anteroom.component.css',
  imports: [
    HeaderAnteroomComponent,
    CodeContainerComponent,
    SectionPlayerComponent,
    HomeComponent,
    CustomButtonComponent,
    AsyncPipe,
    NumberOfReadyPipe,
    FilterPlayersPipe
  ],
})
export class AnteroomComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly _httpService = inject(HttpService);
  private readonly webSocketApi = inject(WebSocketApiService);
  @Input() room_code?: string;
  currentPlayer$ = this.store.select(CURRENT_PLAYER_SELECTS.selectCurrentPlayer)
  players$ = this.store.select(PLAYERS_SELECTS.selectPlayers)
  gameConfig$ = this.store.select(GAME_SELECTORS.selectConfigGame)

  roomInfo: any = {
    num_of_question: 0,
    max_players: 0,
    player_name: '',
    avatar_id: '',
  };

  maxPlayers: number = 0;

  ngOnInit(): void {
    this.currentPlayer$.subscribe(res => console.log(res)
    )
    if (!this.room_code) return;

    this._httpService.getRoom(this.room_code).subscribe(res => {
      this.roomInfo.num_of_question = res.num_of_question;
      this.roomInfo.max_players = res.max_Players;
    });

    this.store.dispatch(GAME_ACTIONS.connectToTheGame({roomCode: this.room_code}))
  }

  changeStatus() {
    if (!this.room_code) return;

    this.webSocketApi.readyPlayer(
      this.room_code,
      1,
      this.roomInfo.player_name,
      this.roomInfo.avatar_id
    );
  }
}
