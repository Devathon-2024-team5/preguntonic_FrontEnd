import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { IAnswer } from '../../store/models/IGame.state';

@Component({
  selector: 'app-response-group',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './response-group.component.html',
  styleUrl: './response-group.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResponseGroupComponent {
  answerData = input<IAnswer[]>([]);
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
