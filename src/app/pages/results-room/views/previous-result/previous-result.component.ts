import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { InGameLayoutComponent } from '../../../../layout/in-game-layout/in-game-layout.component';
import { ProgressBarComponent } from '../../../../components/progress-bar/progress-bar.component';
import { TablePositionsComponent } from '../../../../components/table-positions/table-positions.component';
import { LogoTitleComponent } from '../../../../shared/components/logo-title/logo-title.component';
import { CorrectAnswerComponent } from '../../../../components/correct-answer/correct-answer.component';
import { Store } from '@ngrx/store';
import { GAME_SELECTORS } from '../../../../store/game/game.selectors';

@Component({
  selector: 'app-previous-result',
  standalone: true,
  imports: [
    InGameLayoutComponent,
    ProgressBarComponent,
    TablePositionsComponent,
    LogoTitleComponent,
    CorrectAnswerComponent,
  ],
  templateUrl: './previous-result.component.html',
  styleUrl: './previous-result.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreviousResultComponent implements OnInit {
  players = [1, 2, 3, 4, 5];
  store = inject(Store);

  ngOnInit(): void {
    // this.store
    //   .select(GAME_SELECTORS.selectPrevResults)
    //   .subscribe(res => console.log(res));
  }
}
