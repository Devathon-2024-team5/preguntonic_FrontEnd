import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { GameQuestionComponent } from '../../components/game-question/game-question.component';
import { ResponseGroupComponent } from '../../components/response-group/response-group.component';
import { InGameLayoutComponent } from '../../layout/in-game-layout/in-game-layout.component';
import { LogoTitleComponent } from '../../shared/components/logo-title/logo-title.component';
import { Store } from '@ngrx/store';
import { GAME_SELECTORS } from '../../store/game/game.selectors';
import { GAME_ACTIONS } from '../../store/game/game.actions';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { SpinerComponent } from "../../shared/components/spiner/spiner.component";
import { ModalComponent } from "../../shared/components/modal/modal.component";

@Component({
    selector: 'app-game-room',
    standalone: true,
    templateUrl: './game-room.component.html',
    styleUrl: './game-room.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        InGameLayoutComponent,
        GameQuestionComponent,
        ResponseGroupComponent,
        LogoTitleComponent,
        AsyncPipe,
        JsonPipe,
        SpinerComponent,
        ModalComponent
    ]
})
export class GameRoomComponent implements OnInit{
  store = inject(Store)
  roomCode$ = this.store.select(GAME_SELECTORS.selectRoomCode);
  currentQuestion$ = this.store.select(GAME_SELECTORS.selectCurrentQuestion);

  ngOnInit(): void {
    this.store.dispatch(GAME_ACTIONS.connectToQuestions())
  }
}
