import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PlayerResultsComponent } from '../playerResults/playerResults.component';

// TODO consume and implements table information
@Component({
  selector: 'app-table-positions',
  standalone: true,
  imports: [
    CommonModule,
    PlayerResultsComponent
  ],
  templateUrl: './tablePositions.component.html',
  styleUrl: './tablePositions.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TablePositionsComponent {
  players = [1, 2, 3, 4, 5];
}
