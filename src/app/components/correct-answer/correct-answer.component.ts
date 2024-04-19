import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CapitalizePipe } from '../../shared/pipes/capitalize.pipe';

@Component({
  selector: 'app-correct-answer',
  standalone: true,
  imports: [
    CapitalizePipe
  ],
  templateUrl: './correct-answer.component.html',
  styleUrl: './correct-answer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CorrectAnswerComponent {
  correctAnswer = input.required<string>();
}
