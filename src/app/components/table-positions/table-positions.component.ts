import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { PlayerResultsComponent } from '../player-results/player-results.component';
import { Store } from '@ngrx/store';
import { GAME_SELECTORS } from '../../store/game/game.selectors';
import { IPlayerInGame } from '../../store/models/IPlayers.state';

// TODO consume and implements table information
@Component({
  selector: 'app-table-positions',
  standalone: true,
  imports: [
    CommonModule,
    PlayerResultsComponent
  ],
  templateUrl: './table-positions.component.html',
  styleUrl: './table-positions.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TablePositionsComponent implements OnInit {
  
  store = inject(Store);
  store$ = this.store.select(GAME_SELECTORS.selectPrevResults);
  players: IPlayerInGame [] =[];
  
  ngOnInit(): void {
    this.store$.subscribe(({ players })=>{
      this.players = players
      
    })
  }
 
}
