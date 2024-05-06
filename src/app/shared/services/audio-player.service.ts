import { Injectable } from '@angular/core';

type PlaybackRate = 1 | 1.3 | 1.5 | 1.7 | 2;

@Injectable({
  providedIn: 'root'
})
export class AudioPlayerService {
  private readonly _timerMusic = new Audio('assets/audio/timer-music.wav');

  constructor() {
    this._timerMusic.loop = true;
  }

  public async playAudioPlayer(): Promise<void> {
    this._timerMusic.play();
  }

  public stopAudioPlayer(): void {
    this._timerMusic.pause();
  }

  public setPlaybackRate(rate: PlaybackRate): void {
    this._timerMusic.playbackRate = rate;
  }

  public setAudio(newAudio: string): void {
    this._timerMusic.src = newAudio;
  }
}
