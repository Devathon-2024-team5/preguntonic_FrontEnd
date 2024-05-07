import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapitalizePipe } from '../../shared/pipes/capitalize.pipe';
import { ExitIconButtonComponent } from '../../shared/components/exit-icon-button/exit-icon-button.component';
import { CustomButtonComponent } from '../../shared/components/custom-btn/custom-button.component';

@Component({
  selector: 'app-group-controls',
  standalone: true,
  imports: [
    CapitalizePipe,
    ExitIconButtonComponent,
    CustomButtonComponent
  ],
  templateUrl: './group-controls.component.html',
  styleUrl: './group-controls.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupControlsComponent {

}
