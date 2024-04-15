import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AnswerLabelComponent } from '../answerLabel/answerLabel.component';

@Component({
  selector: 'app-response-group',
  standalone: true,
  imports: [AnswerLabelComponent],
  templateUrl: './responseGroup.component.html',
  styleUrl: './responseGroup.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResponseGroupComponent {
  readonly answerExamples = ['angular', 'vueJS', 'react', 'nextJS'];

}
