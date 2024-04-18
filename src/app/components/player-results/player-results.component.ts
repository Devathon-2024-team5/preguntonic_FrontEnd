import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ImageBasicComponent } from '../../shared/components/image-basic/image-basic.component';

@Component({
  selector: 'app-player-results',
  standalone: true,
  imports: [ImageBasicComponent],
  templateUrl: './player-results.component.html',
  styleUrl: './player-results.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerResultsComponent {

}
