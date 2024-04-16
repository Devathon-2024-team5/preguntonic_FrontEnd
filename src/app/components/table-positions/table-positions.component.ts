import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PlayerResultsComponent } from '../player-results/player-results.component';

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
export class TablePositionsComponent {
  players = [1, 2, 3, 4, 5];
}
