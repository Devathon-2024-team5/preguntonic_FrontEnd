import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { GameQuestionComponent } from '../../components/game-question/game-question.component';
import { ResponseGroupComponent } from '../../components/response-group/response-group.component';
import { InGameLayoutComponent } from '../../layout/in-game-layout/in-game-layout.component';
import { LogoTitleComponent } from '../../shared/components/logo-title/logo-title.component';
import { WebSocketApiService } from '../../core/services/web-socket-api.service';
import { Store } from '@ngrx/store';
import { GAME_SELECTORS } from '../../store/game/game.selectors';
import { GAME_ACTIONS } from '../../store/game/game.actions';

@Component({
  selector: 'app-game-room',
  standalone: true,
  imports: [
    InGameLayoutComponent,
    GameQuestionComponent,
    ResponseGroupComponent,
    LogoTitleComponent
  ],
  templateUrl: './game-room.component.html',
  styleUrl: './game-room.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameRoomComponent implements OnInit{
  sa = inject(WebSocketApiService)
  store = inject(Store)
  roomCode$ = this.store.select(GAME_SELECTORS.selectRoomCode);
  
  ngOnInit(): void {
    this.store.dispatch(GAME_ACTIONS.connectToQuestions())
    //
    // this.roomCode$.subscribe((res)=>{
    //   console.log(res)
    //   this.sa.joinPlayerGame(res,)
    // })
  }
}
