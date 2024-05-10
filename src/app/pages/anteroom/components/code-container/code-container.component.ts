import { Component, input} from '@angular/core';
import { CustomButtonComponent } from '../../../../shared/components/custom-btn/custom-button.component';

@Component({
  selector: 'app-code-container',
  standalone: true,
  templateUrl: './code-container.component.html',
  styleUrl: './code-container.component.css',
  imports: [CustomButtonComponent],
})
export class CodeContainerComponent  {
  room_code = input<string>();

  copyToClipboard() {
    navigator.clipboard.writeText(this.room_code() ?? "");
  }
}
