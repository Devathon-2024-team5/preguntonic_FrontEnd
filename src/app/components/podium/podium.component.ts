import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { ImageBasicComponent } from '../../shared/components/image-basic/image-basic.component';
import { Store } from '@ngrx/store';
import { PLAYERS_SELECTS } from '../../store/players/players.selectors';
import { IPlayer } from '../../store/models/IPlayers.state';
import { TopPlayer } from '../../store/types/store.dto';
import { AvatarWithFrameComponent } from '../../shared/components/avatar-with-frame/avatar-with-frame.component';

//TODO add canvas-confetti library and implements winners' information
@Component({
  selector: 'app-podium',
  standalone: true,
  templateUrl: './podium.component.html',
  styleUrl: './podium.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ImageBasicComponent,AvatarWithFrameComponent],
})
export class PodiumComponent implements OnInit {
  private store = inject(Store);
  score$ = this.store.select(PLAYERS_SELECTS.selectPlayers);
  players: IPlayer[] = [];
  topPlayer: TopPlayer[] = [];
  readonly podiumSteps = ['100', '80', '60'];
  @Input() playerPositions: { position: number; name: string; avatar: string; score:number}[] = [];
  tabla:boolean = false;

  ngOnInit() {
    this.score$.subscribe(res => {
      this.players = [...res];
      this.updateTopPlayers();
      this.updatePlayerPositions();
    });
  }

  private updateTopPlayers(): void {
    this.topPlayer = this.players.slice(0, 3);
  }

  private updatePlayerPositions(): void {
    this.playerPositions = this.players.map((player, index) => ({
      position: index + 1,
      name: player.playerName,
      avatar: player.avatar,
      score: player.score
    }));
  }
}
