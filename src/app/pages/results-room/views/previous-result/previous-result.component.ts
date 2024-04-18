import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InGameLayoutComponent } from '../../../../layout/in-game-layout/in-game-layout.component';
import { AnswerLabelComponent } from '../../../../components/answer-label/answer-label.component';
import { ProgressBarComponent } from '../../../../components/progress-bar/progress-bar.component';
import { TablePositionsComponent } from '../../../../components/table-positions/table-positions.component';
import { LogoTitleComponent } from '../../../../shared/components/logo-title/logo-title.component';

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
