import { Component, Input } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { CustomButtonComponent } from '../custom-btn/custom-button.component';
import { Router } from '@angular/router';
import { WebSocketApiService } from '../../../core/services/web-socket-api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exit-icon-button',
  standalone: true,
  imports: [ModalComponent,CustomButtonComponent,CommonModule],
  templateUrl: './exit-icon-button.component.html',
  styleUrl: './exit-icon-button.component.css'
})
export class ExitIconButtonComponent {
  @Input() size: "" | "medium" = "";
  stateModal = false;

  constructor (private router: Router, private webSocketAPI: WebSocketApiService){}
  openModal() {
    this.stateModal = true;
    document.body.classList.add('without-overflow');
  }

  closeModal() {
    this.stateModal = false;
    document.body.classList.remove('without-overflow');
  }

  redirect() {
    this.closeModal();
    this.router.navigate(['/home']);
    this.webSocketAPI._disconnect();
  }
}
