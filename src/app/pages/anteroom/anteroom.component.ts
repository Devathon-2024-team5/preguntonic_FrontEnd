import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ElementRef,
  inject,
} from '@angular/core';
import { HeaderAnteroomComponent } from './components/header-anteroom/header-anteroom.component';
import { CodeContainerComponent } from './components/code-container/code-container.component';
import { SectionPlayerComponent } from './components/section-player/section-player.component';
import { HomeComponent } from '../home/home.component';
import { HttpService } from '../../core/services/http.service';
import { CustomButtonComponent } from '../../shared/components/custom-btn/custom-button.component';
import { ActivatedRoute } from '@angular/router';
import { WebSocketApiService } from '../../core/services/web-socket-api.service';
import { RoomPlayer } from '../room-configuration/room-configuration.component';
import { IPlayer } from '../../store/models/IPlayers.state';

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

  constructor(
    private httpService: HttpService,
    private route: ActivatedRoute,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const code = params.get('room_code');
      const playerDataString = params.get('roomPlayer');
      if (!code || !playerDataString) return;

      const playerData: RoomPlayer = JSON.parse(playerDataString);
      this.maxPlayers = playerData.max_players;
      if (!playerData.player_name || !playerData.avatar_id) {
        console.error('playerData no tiene los campos esperados:', playerData);
        return;
      }

      this.roomInfo.player_name = playerData.player_name;
      this.roomInfo.avatar_id = playerData.avatar_id;

      this.httpService.getRoom(code).subscribe(res => {
        //TODO Verificar el tipado de la respuesta  
       console.log('Web socket', res); 
        this.roomInfo.num_of_question = res.num_of_question;
        this.roomInfo.max_players = res.max_Players;
      });
      
      this.webSocketApi._connect(
        code,
        this.roomInfo.player_name,
        this.roomInfo.avatar_id
      );
    });
  }

  changeStatus() {
      this.route.queryParamMap.subscribe(params => {
        const code = params.get('room_code');
        if (code === null ) return  
      this.webSocketApi.readyPlayer(code,1,this.roomInfo.player_name,this.roomInfo.avatar_id)
  })
  }
}
