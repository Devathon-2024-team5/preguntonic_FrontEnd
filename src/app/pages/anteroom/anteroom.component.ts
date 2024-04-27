import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ElementRef
} from '@angular/core';
import { HeaderAnteroomComponent } from './components/header-anteroom/header-anteroom.component';
import { CodeContainerComponent } from './components/code-container/code-container.component';
import { SectionPlayerComponent } from './components/section-player/section-player.component';
import { HomeComponent, Player } from '../home/home.component';
import { HttpRoomService } from '../../shared/services/http.room.service';
import { CustomButtonComponent } from '../../shared/components/custom-btn/custom-button.component';
import { ActivatedRoute } from '@angular/router';
import { WebSocketAPI } from '../../shared/services/web.socket.api';
import { RoomPlayer } from '../room-configuration/room-configuration.component';


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
    CustomButtonComponent
  ],
})
export class AnteroomComponent implements OnInit{
  
  changeStatus(){ //this is a test
    const element = this.elementRef.nativeElement.querySelector('.offBar');
    
    if (element ) {
      element.classList.remove('offBar');
      element.classList.add('onBar');
    }
  }
  roomInfo: RoomPlayer = {
    num_of_question: 0,
    max_players: 0,
    player_name:'' ,
    avatar_id:''
  }

  maxPlayers: number = 0;

  players: Player[] = [
    {
      id: 1,
      avatar: '../../../assets/avatar-1.webp',
      name: 'Jugador 1',
      estado: true,
    },
    {
      id: 2,
      avatar: '../../../assets/avatar-2.webp',
      name: 'Jugador 2',
      estado: true,
    },
    {
      id: 3,
      avatar: '../../../assets/avatar-3.webp',
      name: 'Jugador 3',
      estado: true,
    },
  ];

  constructor(
    private httpService: HttpRoomService,
    private route: ActivatedRoute,
    private elementRef: ElementRef,
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
        this.roomInfo.num_of_question = res.num_of_question;
        this.roomInfo.max_players = res.max_Players;
      });

      const webSocketApi = new WebSocketAPI();
      webSocketApi._connect(code, this.roomInfo.player_name, this.roomInfo.avatar_id);
    });
  }
}
