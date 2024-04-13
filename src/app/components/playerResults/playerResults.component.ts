import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ImageBasicComponent } from '../../shared/UI/imageBasic/ImageBasic.component';

@Component({
  selector: 'app-player-results',
  standalone: true,
  imports: [ImageBasicComponent],
  templateUrl: './playerResults.component.html',
  styleUrl: './playerResults.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerResultsComponent {

}
