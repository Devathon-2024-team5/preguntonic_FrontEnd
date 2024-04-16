import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PlayerResultsComponent } from '../../components/player-results/player-results.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-in-game-layout',
  standalone: true,
  imports: [PlayerResultsComponent, RouterLink],
  templateUrl: './in-game-layout.component.html',
  styleUrl: './in-game-layout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InGameLayoutComponent {}
