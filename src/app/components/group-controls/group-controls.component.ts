import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapitalizePipe } from '../../shared/pipes/capitalize.pipe';

@Component({
  selector: 'app-group-controls',
  standalone: true,
  imports: [
    CapitalizePipe
  ],
  templateUrl: './group-controls.component.html',
  styleUrl: './group-controls.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupControlsComponent {

}
