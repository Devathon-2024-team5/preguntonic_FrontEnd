import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { ImageBasicComponent } from '../../shared/components/image-basic/image-basic.component';
import { Store } from '@ngrx/store';
import { PLAYERS_SELECTS } from '../../store/players/players.selectors';

//TODO add canvas-confetti library and implements winners' information
@Component({
  selector: 'app-podium',
  standalone: true,
  templateUrl: './podium.component.html',
  styleUrl: './podium.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ImageBasicComponent],
})
export class PodiumComponent implements OnInit {
  readonly podiumSteps = ['100', '80', '60'];
  private store = inject(Store);
  score$ = this.store.select(PLAYERS_SELECTS.selectPlayers);

  ngOnInit() {
    this.score$.subscribe(res => {
      // Make a copy of the original array to not modify it directly
      const scoresCopy = [...res];

      // Sort the copied array in descending order based on the score
      scoresCopy.sort((a, b) => b.score - a.score);

       // Take the first three elements of the sorted array
      const topThreeScores = scoresCopy.slice(0, 3);
      /// Print the top three scores
      console.log('Los tres puntajes más altos son:');
      topThreeScores.forEach((item, index) => {
        console.log(`Puesto ${index + 1}: ${item.score}`);
      });
    });
  }
}
