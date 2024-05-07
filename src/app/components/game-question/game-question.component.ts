import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { TimerComponent } from '../timer/timer.component';
import { GAME_SELECTORS } from '../../store/game/game.selectors';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-game-question',
  standalone: true,
  imports: [TimerComponent, AsyncPipe],
  templateUrl: './game-question.component.html',
  styleUrl: './game-question.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameQuestionComponent {
  question = input<{
    question: string;
    numberQuestion: number;
  }>();
  private readonly store = inject(Store);
  maxQ$= this.store.select(GAME_SELECTORS.selectConfigGame)
  
}
