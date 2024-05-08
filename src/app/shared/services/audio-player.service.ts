import { Injectable } from '@angular/core';

type PlaybackRate = 1 | 1.3 | 1.5 | 1.7 | 2;

@Injectable({
  providedIn: 'root'
})
export class AudioPlayerService {

  private readonly _audio = new Audio('assets/audio/timer-music.wav');

  public async playAudioPlayer(): Promise<void> {
    this._audio.play();
  }

  public stopAudioPlayer(): void {
    this._audio.pause();
  }

  public setPlaybackRate(rate: PlaybackRate): void {
    this._audio.playbackRate = rate;
  }

  public setVolume(volume: number): void {
    this._audio.volume = volume; // El volumen debe ser un valor entre 0 y 1
  }

  public setAudio(newAudio: string): void {
    this._audio.src = newAudio;
  }

  public setLoop(inLoop:boolean):void {
    this._audio.loop = inLoop;
  }
}
