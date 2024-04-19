import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { IAnswerInfo } from '../../core/models/IQuestionInfo.interface';
import {
  FormGroup,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-response-group',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './response-group.component.html',
  styleUrl: './response-group.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResponseGroupComponent {
  answerData = input<IAnswerInfo>({
    answers: ['angular', 'vueJS', 'react', 'nextJS'],
    correctAnswer: 0,
  });
  answersForm: FormGroup;
  private readonly _fb = inject(FormBuilder);

  constructor() {
    this.answersForm = this._fb.nonNullable.group({
      answer: ['', Validators.required],
    });
  }

  public checkAnswer(): void {
    console.log(this.answersForm.value);
  }
}
