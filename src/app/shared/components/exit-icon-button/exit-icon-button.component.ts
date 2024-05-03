import { Component } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { CustomButtonComponent } from '../custom-btn/custom-button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exit-icon-button',
  standalone: true,
  imports: [ModalComponent,CustomButtonComponent],
  templateUrl: './exit-icon-button.component.html',
  styleUrl: './exit-icon-button.component.css'
})
export class ExitIconButtonComponent {

  stateModal = false;

  constructor (private router: Router){}
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
  }
}
