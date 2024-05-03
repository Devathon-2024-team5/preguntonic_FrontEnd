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
import { RoomPlayer } from '../room-configuration/room-configuration.component';
import { IPlayer } from '../../store/models/IPlayers.state';
import { ActivatedRoute } from '@angular/router';
import { PLAYERS_SELECTS } from '../../store/players/players.selectors';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

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
  ],
})
export class AnteroomComponent implements OnInit {
  @Input() room_code?: string;
  store = inject(Store);
  roomInfo: RoomPlayer = {
    num_of_question: 0,
    max_players: 0,
    player_name: '',
    avatar_id: '',
  };

  maxPlayers: number = 0;

  players: IPlayer[] = [
    {
      id: '1',
      avatar: '../../../assets/avatar-1.webp',
      name: 'Jugador 1',
      score: 0,
      isReady: true,
    },
    {
      id: '1',
      avatar: '../../../assets/avatar-1.webp',
      name: 'Jugador 1',
      score: 0,
      isReady: true,
    },
    {
      id: '1',
      avatar: '../../../assets/avatar-1.webp',
      name: 'Jugador 1',
      score: 0,
      isReady: true,
    },
  ];
  webSocketApi = inject(WebSocketApiService);

  dataPlayer$: Observable<Pick<IPlayer, 'avatar' | 'name'>>;

  constructor(private route: ActivatedRoute, private httpService: HttpService) {
    this.dataPlayer$ = this.store.select(PLAYERS_SELECTS.selectPlayersCurrent);
  }


  ngOnInit(): void {
    this.dataPlayer$.subscribe(res => {
      this.roomInfo.avatar_id = res.avatar;
      this.roomInfo.player_name = res.name;
    })


    if (!this.room_code) return;

    this.httpService.getRoom(this.room_code).subscribe(res => {
      this.roomInfo.num_of_question = res.num_of_question;
      this.roomInfo.max_players = res.max_Players;
    });
    
    this.webSocketApi._connect(
      this.room_code,
      this.roomInfo.player_name,
      this.roomInfo.avatar_id
    );
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
