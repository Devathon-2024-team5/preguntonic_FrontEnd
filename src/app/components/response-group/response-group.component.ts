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
import { ModalComponent } from "../../shared/components/modal/modal.component";
import { SpinerComponent } from '../../shared/components/spiner/spiner.component';

@Component({
    selector: 'app-response-group',
    standalone: true,
    templateUrl: './response-group.component.html',
    styleUrl: './response-group.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ReactiveFormsModule, JsonPipe, ModalComponent, SpinerComponent]
})
export class ResponseGroupComponent {
  private readonly _fb = inject(FormBuilder);
  private readonly store = inject(Store);
  answerData = input<IAnswer[]>([]);
  idQuestion = input.required<string>();
  answersForm: FormGroup;
  inOpen = false;


  constructor() {
    this.answersForm = this._fb.nonNullable.group({
      answer: ['', Validators.required],
    });
  }

  public checkAnswer(id: string): void {
    this.inOpen = true;
    this.answersForm.disable();
    this.store.dispatch(
      GAME_ACTIONS.sendResponse({
        answerId: id,
        idQuestion: this.idQuestion(),
      })
    );
  }
}
