import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InGameLayoutComponent } from '../../../../Layout/inGameLayout/inGameLayout.component';
import { AnswerLabelComponent } from '../../../../components/answerLabel/answerLabel.component';
import { ProgressBarComponent } from '../../../../components/progressBar/progressBar.component';
import { TablePositionsComponent } from '../../../../components/tablePositions/tablePositions.component';
import { LogoTitleComponent } from '../../../../shared/UI/logoTitle/logoTitle.component';

@Component({
  selector: 'app-previous-result',
  standalone: true,
  imports: [
    InGameLayoutComponent,
    ProgressBarComponent,
    TablePositionsComponent,
    AnswerLabelComponent,
    LogoTitleComponent
  ],
  templateUrl: './previous-result.component.html',
  styleUrl: './previous-result.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreviousResultComponent {
  players = [1, 2, 3, 4, 5];
}
