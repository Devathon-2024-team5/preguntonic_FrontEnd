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
import { Store } from '@ngrx/store';
import { GAME_ACTIONS } from '../../store/game/game.actions';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-response-group',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './response-group.component.html',
  styleUrl: './response-group.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResponseGroupComponent {
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

  public checkAnswer(id: string): void {
    console.log(id);
    this.answersForm.disable();
    this.store.dispatch(
      GAME_ACTIONS.sendResponse({
        answerId: id,
        idQuestion: this.idQuestion(),
      })
    );
  }
}
