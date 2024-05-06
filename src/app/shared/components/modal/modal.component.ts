import { CommonModule } from '@angular/common';
import { Component, Input, Signal, inject } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  private readonly modalService = inject(ModalService);
  isOpenModal:Signal<boolean>;

  @Input() isOpen = false;
  
  constructor() {
    this.isOpenModal = this.modalService.modalComputed
  }
}
