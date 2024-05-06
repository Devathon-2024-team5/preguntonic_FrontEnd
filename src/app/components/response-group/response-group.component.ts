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
import { IAnswer } from '../../store/models/IGame.state';
import { Store } from '@ngrx/store';
import { GAME_ACTIONS } from '../../store/game/game.actions';

@Component({
  selector: 'app-response-group',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './response-group.component.html',
  styleUrl: './response-group.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResponseGroupComponent {
  isDisasbled = false;
  answerData = input<IAnswer[]>([]);
  idQuestion = input.required<string>();
  answersForm: FormGroup;
  private readonly _fb = inject(FormBuilder);
  private readonly store = inject(Store);

  constructor() {
    this.answersForm = this._fb.nonNullable.group({
      answer: ['', Validators.required],
    });
  }

  public checkAnswer(): void {
    this.isDisasbled = true;
    this.store.dispatch(GAME_ACTIONS.sendResponse({answer: this.answersForm.value, idQuestion: this.idQuestion() }))
  }
}
