import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GameQuestionComponent } from '../../components/gameQuestion/gameQuestion.component';
import { ResponseGroupComponent } from '../../components/responseGroup/responseGroup.component';
import { InGameLayoutComponent } from '../../layout/inGameLayout/inGameLayout.component';
import { LogoTitleComponent } from '../../shared/UI/logoTitle/logoTitle.component';

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
