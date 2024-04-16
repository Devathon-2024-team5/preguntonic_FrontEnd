import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ImageBasicComponent } from '../../shared/components/image-basic/image-basic.component';

@Component({
  selector: 'app-answer-label',
  standalone: true,
  imports: [ImageBasicComponent],
  templateUrl: './answer-label.component.html',
  styleUrl: './answer-label.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnswerLabelComponent {
  answer = input.required<string>();
  isActiveStyle = input<boolean>();
}
