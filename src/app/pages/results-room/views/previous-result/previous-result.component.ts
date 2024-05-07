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
import { AsyncPipe } from '@angular/common';
import { ModalComponent } from "../../../../shared/components/modal/modal.component";
import { SpinerComponent } from "../../../../shared/components/spiner/spiner.component";

@Component({
    selector: 'app-previous-result',
    standalone: true,
    templateUrl: './previous-result.component.html',
    styleUrl: './previous-result.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        InGameLayoutComponent,
        ProgressBarComponent,
        TablePositionsComponent,
        LogoTitleComponent,
        CorrectAnswerComponent,
        AsyncPipe,
        ModalComponent,
        SpinerComponent
    ]
})
export class PreviousResultComponent implements OnInit{
  private readonly store = inject(Store)
  Answers$ = this.store.select(GAME_SELECTORS.selectPrevResults)
  correctAnswer = ""

  ngOnInit(): void {
    this.Answers$.subscribe(res => {
      console.log( 'PREVIOUS RESULT' + JSON.stringify(res.correct_answer))
      this.correctAnswer= res.correct_answer
    })
    
  }
  

}
