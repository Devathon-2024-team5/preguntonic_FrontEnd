import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  afterNextRender,
  effect,
  inject,
  signal,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { GAME_ACTIONS } from '../../store/game/game.actions';
import { AudioPlayerService } from '../../shared/services/audio-player.service';
import { asapScheduler } from 'rxjs/internal/scheduler/asap';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimerComponent implements OnDestroy, OnInit {
  @Input({ required: true }) idQuestion?: string;
  timer = signal<number>(30);
  timerInterval?: NodeJS.Timeout;
  private readonly _speedLoader = 1000;
  private readonly _cdRef = inject(ChangeDetectorRef);
  private readonly store = inject(Store);
  private readonly _audioPlayerService = inject(AudioPlayerService);

  constructor() {
    this._audioPlayerService.setAudio('assets/audio/timer-music.wav');
    this._audioPlayerService.setLoop(true);
    this._audioPlayerService.setVolume(0.4);

    afterNextRender(() => {
      this.timerInterval = setInterval(
        () => this.initLoader(),
        this._speedLoader
      );
    });

    effect(() => {
      switch (this.timer()) {
        case 0:
          asapScheduler.schedule(() => this.clearEvents());
          break;
        case 15:
          this._audioPlayerService.setPlaybackRate(1.7);
          break;
      }
    });
  }

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
    if (!this.idQuestion) return;

    clearInterval(this?.timerInterval);
    this._audioPlayerService.stopAudioPlayer();
    this.store.dispatch(
      GAME_ACTIONS.sendResponse({
        answerId: null,
        idQuestion: this.idQuestion,
      })
    );
  }

  ngOnDestroy(): void {
    this.clearEvents();
  }
}
