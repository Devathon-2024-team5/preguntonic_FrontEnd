import { Component, inject, input} from '@angular/core';
import { CustomButtonComponent } from '../../../../shared/components/custom-btn/custom-button.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-code-container',
  standalone: true,
  templateUrl: './code-container.component.html',
  styleUrl: './code-container.component.css',
  imports: [CustomButtonComponent],
})
export class CodeContainerComponent {
  private readonly toastService = inject(ToastrService);
  room_code = input<string>();

  copyToClipboard() {
    navigator.clipboard.writeText(this.room_code() ?? "");
    this.toastService.success('Room code copied to clipboard', 'Preguntonic');
  }
}
