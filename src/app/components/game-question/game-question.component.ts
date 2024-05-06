import {
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';
import { TimerComponent } from '../timer/timer.component';

@Component({
  selector: 'app-game-question',
  standalone: true,
  imports: [TimerComponent],
  templateUrl: './game-question.component.html',
  styleUrl: './game-question.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameQuestionComponent {
  question = input<{
    question: string;
    numberQuestion: number;
  }>();
}
