import { Injectable, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private isViewModalOpen = signal<boolean>(false);
  modalComputed = computed(() => this.isViewModalOpen());

  public toggleViewModal(): void {
    this.isViewModalOpen.update(prev => !prev);
  }
}
