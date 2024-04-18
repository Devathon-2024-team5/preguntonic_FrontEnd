import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IQuestionInfo,  } from '../../core/models/IQuestionInfo.interface';
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
  question = input<IQuestionInfo>({
    question: '¿Cuál de las siguientes tecnologías de desarrollo web no es un framework?',
    numberQuestion: 1,
  })
}
