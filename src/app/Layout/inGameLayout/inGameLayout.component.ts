import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PlayerResultsComponent } from '../../components/playerResults/playerResults.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-in-game-layout',
  standalone: true,
  imports: [PlayerResultsComponent, RouterLink],
  templateUrl: './inGameLayout.component.html',
  styleUrl: './inGameLayout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InGameLayoutComponent {}
