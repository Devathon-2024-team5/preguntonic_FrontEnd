import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { PlayerResultsComponent } from '../player-results/player-results.component';
import { PLAYERS_SELECTS } from '../../store/players/players.selectors';
import { Store } from '@ngrx/store';

// TODO consume and implements table information
@Component({
  selector: 'app-table-positions',
  standalone: true,
  imports: [CommonModule, PlayerResultsComponent],
  templateUrl: './table-positions.component.html',
  styleUrl: './table-positions.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TablePositionsComponent implements OnInit {
  private store = inject(Store);
  players$ = this.store.select(PLAYERS_SELECTS.selectPlayers);
  players: number = 0;

  ngOnInit(): void {
    this.players$.subscribe(res => {
      return (this.players = res.length);
    });
  }
}
