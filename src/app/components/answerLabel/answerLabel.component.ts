import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ImageBasicComponent } from '../../shared/UI/imageBasic/ImageBasic.component';

@Component({
  selector: 'app-answer-label',
  standalone: true,
  imports: [ImageBasicComponent],
  templateUrl: './answerLabel.component.html',
  styleUrl: './answerLabel.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnswerLabelComponent {
  answer = input.required<string>();
}
