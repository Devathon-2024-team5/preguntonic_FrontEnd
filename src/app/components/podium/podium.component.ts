import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { ImageBasicComponent } from '../../shared/components/image-basic/image-basic.component';
import { Store } from '@ngrx/store';
import { IPlayerInGame } from '../../store/models/IPlayers.state';
import { AvatarWithFrameComponent } from '../../shared/components/avatar-with-frame/avatar-with-frame.component';
import { GAME_SELECTORS } from '../../store/game/game.selectors';
import { AudioPlayerService } from '../../shared/services/audio-player.service';

//TODO add canvas-confetti library and implements winners' information
@Component({
  selector: 'app-podium',
  standalone: true,
  templateUrl: './podium.component.html',
  styleUrl: './podium.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ImageBasicComponent,AvatarWithFrameComponent],
})
export class PodiumComponent implements OnInit, OnDestroy {
  private readonly store = inject(Store);
  private readonly _audioPlayerService = inject(AudioPlayerService);
  @Input() playerPositions: { position: number; name: string; avatar: string; score:number}[] = [];
  store$ = this.store.select(GAME_SELECTORS.selectPrevResults);
  players: IPlayerInGame [] =[];
  topPlayer: IPlayerInGame[] = [];
  readonly podiumSteps = ['100', '80', '60'];
  tabla:boolean = false;

  ngOnInit() {
    this.store$.subscribe(({ players })=>{
      console.log("Players: " + players)
      const playersCopy = [...players]
      this.players = playersCopy.sort((a, b) => b.score - a.score);
      this.updateTopPlayers();
      this.updatePlayerPositions();
    })

    this._audioPlayerService.setAudio("assets/audio/pedro.mp3");
    this._audioPlayerService.setLoop(false);
    this._audioPlayerService.setVolume(.5);
    this._audioPlayerService.playAudioPlayer();
  }

  private updateTopPlayers(): void {
    this.topPlayer = this.players.slice(0, 3);
  }

  private updatePlayerPositions(): void {
    this.playerPositions = this.players.map((player, index) => ({
      position: index + 1,
      name: player.nickname,
      avatar: player.avatar,
      score: player.score
    }));
  }

  ngOnDestroy(): void {
    this._audioPlayerService.stopAudioPlayer()
  }
}
