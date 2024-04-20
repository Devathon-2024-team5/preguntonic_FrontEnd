import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LogoTitleComponent } from '../../../../shared/components/logo-title/logo-title.component';
import { PodiumComponent } from '../../../../components/podium/podium.component';
import { GroupControlsComponent } from '../../../../components/group-controls/group-controls.component';

//  TODO implements Presentational container for consume and share data
@Component({
  selector: 'app-final-results',
  standalone: true,
  imports: [
    LogoTitleComponent,
    PodiumComponent,
    GroupControlsComponent
  ],
  templateUrl: './final-results.component.html',
  styleUrl: './final-results.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinalResultsComponent {
}
