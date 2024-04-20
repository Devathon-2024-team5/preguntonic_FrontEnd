import { ChangeDetectionStrategy, Component, Input, OnInit, Output, inject } from '@angular/core';
import { HeaderAnteroomComponent } from './components/header-anteroom/header-anteroom.component';
import { CodeContainerComponent } from './components/code-container/code-container.component';
import { SectionPlayerComponent } from './components/section-player/section-player.component';
import { HomeComponent, Player } from '../home/home.component';
import { HttpRoomService } from '../../shared/services/http.room.service';
import { CustomButtonComponent } from "../../shared/components/custom-btn/custom-button.component";
import { ActivatedRoute } from '@angular/router';
import { WebSocketAPI } from '../../shared/services/web.socket.api';

export interface RoomInfo {
  code: string;
  numQuestions: number;
  maxPlayers: number;
}

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
    ]
})
export class AnteroomComponent implements OnInit{
  @Output() avatar: string = '../../../assets/avatar-1.webp';
  @Output() playerName: string = 'Pedro';
  @Input()
  set maxPlayers(value: number) {
    this._maxPlayers = value;  
  }

  get maxPlayers(): number {
    return this._maxPlayers;
  }
  private _maxPlayers: number  =0;
  roomInfo: RoomInfo = {
    code: '',
    numQuestions: 0,
    maxPlayers: 0
  }

  webSocketApi: WebSocketAPI | undefined;

  players: Player[] =
  [
      {
        id: 1,
        avatar: '../../../assets/avatar-1.webp',
        name: 'Jugador 1',
        estado: true,
      },
      {
        id:2,
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

  private httpService = inject(HttpRoomService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private coderoom: string = '';

  ngOnInit(): void {

    this.route.queryParamMap.subscribe(params => {
      const code = params.get('room_code')
        if (!code) return;
        this.coderoom = code;
        console.log(this.coderoom);

        this.httpService
        .getRoom(this.coderoom)
        .subscribe(res => {
          
          console.log(res);
          this.roomInfo.code = res.code;
          this.roomInfo.numQuestions = res.numQuestions;
          this.roomInfo.maxPlayers = res.maxPlayers;
          this._maxPlayers = res.maxPlayers;
          console.log("Room-info",this.roomInfo);
        });

        this.webSocketApi = new WebSocketAPI();
        this.webSocketApi._connect(this.coderoom, this.playerName, this.avatar);
    });
    
  }

}
