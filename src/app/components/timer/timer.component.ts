import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  afterNextRender,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { GAME_SELECTORS } from '../../store/game/game.selectors';
import { GAME_ACTIONS } from '../../store/game/game.actions';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimerComponent implements OnDestroy {
  initValue = input<number>();
  timer = signal<number>(30);
  timerInterval?: NodeJS.Timeout;
  private _speedLoader = 1000;
  private readonly _cdRef = inject(ChangeDetectorRef);
  private readonly store = inject(Store);

  constructor() {
    afterNextRender(() => {
      this.timerInterval = setInterval(
        () => this.initLoader(),
        this._speedLoader
      );
    });

    effect(
      () =>
        this.timer() === 0 && ''
        // this.store.dispatch(GAME_ACTIONS.saveTimeResponse({ time: 0 }))
    );
  }

  private initLoader(): void {
    this.timer.update(prev => prev - 1);
    this.store.dispatch(GAME_ACTIONS.saveTimeResponse({ time: this.timer() }))
    this._cdRef.detectChanges();

    if (this.timer() === 0) this.stopTimer;
  }

  private stopTimer(): void {
    clearInterval(this?.timerInterval);
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }
}
