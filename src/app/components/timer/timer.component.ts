import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  afterNextRender,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { GAME_ACTIONS } from '../../store/game/game.actions';
import { AudioPlayerService } from '../../shared/services/audio-player.service';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimerComponent implements OnDestroy, OnInit {
  initValue = input<number>();
  timer = signal<number>(30);
  timerInterval?: NodeJS.Timeout;
  private readonly _speedLoader = 1000;
  private readonly _cdRef = inject(ChangeDetectorRef);
  private readonly store = inject(Store);
  private readonly _audioPlayerService = inject(AudioPlayerService);

  constructor() {
    afterNextRender(() => {
      this.timerInterval = setInterval(
        () => this.initLoader(),
        this._speedLoader
      );
    });

    effect(() => {
      switch (this.timer()) {
        case 0:
          this.clearEvents();
          break;
        case 15:
          this._audioPlayerService.setPlaybackRate(1.7);
          break;
      }
    });
  }
  // this.timer() === 0 && ''
  // this.store.dispatch(GAME_ACTIONS.saveTimeResponse({ time: 0 }))

  ngOnInit() {
    this._audioPlayerService.playAudioPlayer();
  }

  private initLoader(): void {
    this.timer.update(prev => prev - 1);
    this.store.dispatch(
      GAME_ACTIONS.saveTimeResponse({ time: this.timer(), isSetTimeout: false })
    );
    this._cdRef.detectChanges();
  }

  private clearEvents(): void {
    clearInterval(this?.timerInterval);
    this._audioPlayerService.stopAudioPlayer();
  }

  ngOnDestroy(): void {
    this.clearEvents();
  }
}
