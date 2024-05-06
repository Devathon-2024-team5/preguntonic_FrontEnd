import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { ImageBasicComponent } from '../../shared/components/image-basic/image-basic.component';
import { Store } from '@ngrx/store';
import { PLAYERS_SELECTS } from '../../store/players/players.selectors';
import { AsyncPipe } from '@angular/common';
import { CURRENT_PLAYER_SELECTS } from '../../store/current-player/current-player.selectors';
import { filter, tap } from 'rxjs';
import { concatLatestFrom } from '@ngrx/operators';
import { AvatarWithFrameComponent } from '../../shared/components/avatar-with-frame/avatar-with-frame.component';

@Component({
  selector: 'app-player-results',
  standalone: true,
  imports: [AvatarWithFrameComponent,ImageBasicComponent, AsyncPipe],
  templateUrl: './player-results.component.html',
  styleUrl: './player-results.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerResultsComponent implements OnInit {
  private readonly store = inject(Store);
  player$ = this.store.select(CURRENT_PLAYER_SELECTS.selectCurrentPlayer);
  score = 0;

  ngOnInit(): void {
    this.player$.subscribe(res => {
      this.store.select(PLAYERS_SELECTS.selectPlayers).subscribe(players => {
        this.score = players.filter(p => p.playerId === res.playerId).map(p => p.score)[0];
      })
    })
  }
}
