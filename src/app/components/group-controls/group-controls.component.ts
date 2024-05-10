import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CapitalizePipe } from '../../shared/pipes/capitalize.pipe';
import { ExitIconButtonComponent } from '../../shared/components/exit-icon-button/exit-icon-button.component';
import { CustomButtonComponent } from '../../shared/components/custom-btn/custom-button.component';
import { TablePositionsComponent } from "../table-positions/table-positions.component";
import { ModalComponent } from "../../shared/components/modal/modal.component";
import { PreviousResultComponent } from "../../pages/results-room/views/previous-result/previous-result.component";

@Component({
    selector: 'app-group-controls',
    standalone: true,
    templateUrl: './group-controls.component.html',
    styleUrl: './group-controls.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CapitalizePipe,
        ExitIconButtonComponent,
        CustomButtonComponent,
        TablePositionsComponent,
        ModalComponent,
        PreviousResultComponent
    ]
})
export class GroupControlsComponent {
  stateModal = signal(false);
  openModal(event: MouseEvent) {
    event.preventDefault();
    this.stateModal.update(() => true);
  }

  closeModal(){
    this.stateModal.update(() => false);
  }

}
