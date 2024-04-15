import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-game-question',
  standalone: true,
  imports: [],
  templateUrl: './gameQuestion.component.html',
  styleUrl: './gameQuestion.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameQuestionComponent {}
