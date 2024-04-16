import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GameQuestionComponent } from '../../components/game-question/game-question.component';
import { ResponseGroupComponent } from '../../components/response-group/response-group.component';
import { InGameLayoutComponent } from '../../layout/in-game-layout/in-game-layout.component';
import { LogoTitleComponent } from '../../shared/components/logo-title/logo-title.component';

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
export class GameRoomComponent {}
