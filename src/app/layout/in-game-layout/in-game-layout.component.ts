import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PlayerResultsComponent } from '../../components/player-results/player-results.component';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { CURRENT_PLAYER_SELECTS } from '../../store/current-player/current-player.selectors';
import { AsyncPipe } from '@angular/common';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-in-game-layout',
  standalone: true,
  imports: [PlayerResultsComponent, RouterLink, AsyncPipe, JsonPipe],
  templateUrl: './in-game-layout.component.html',
  styleUrl: './in-game-layout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InGameLayoutComponent {
  private readonly store = inject(Store)
  player$ = this.store.select(CURRENT_PLAYER_SELECTS.selectCurrentPlayer)
}
