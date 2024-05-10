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
import { CapitalizePipe } from '../../shared/pipes/capitalize.pipe';
import { IProgressBarConfig } from '../../core/models/IConfigProgressBar.interface';
import { Store } from '@ngrx/store';
import { GAME_ACTIONS } from '../../store/game/game.actions';
import { asapScheduler } from 'rxjs/internal/scheduler/asap';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [CapitalizePipe],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBarComponent implements OnDestroy {
  progress = signal<number>(0);
  configBar = input.required<IProgressBarConfig>();
  private _loaderTimer?: NodeJS.Timeout;
  private _speedLoader = 5000 / 100;
  private readonly _cdRef = inject(ChangeDetectorRef);
  private readonly store = inject(Store);

  constructor() {
    afterNextRender(() => {
      this._loaderTimer = setInterval(
        () => this.initLoader(),
        this._speedLoader
      );
    });

    effect(() => {
      if (this.progress() === 100) {
        asapScheduler.schedule(() =>
          this.store.dispatch(GAME_ACTIONS.nextQuestion())
        );
        this.stopLoader();
      }
    });
  }

  private initLoader(): void {
    this.progress.set(this.progress() + 1);

    this._cdRef.detectChanges();
  }

  private stopLoader(): void {
    clearInterval(this?._loaderTimer);
  }

  ngOnDestroy(): void {
    clearInterval(this?._loaderTimer);
  }
}
