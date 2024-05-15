import { Component, Input, inject } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { CustomButtonComponent } from '../custom-btn/custom-button.component';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { GAME_ACTIONS } from '../../../store/game/game.actions';

@Component({
  selector: 'app-exit-icon-button',
  standalone: true,
  imports: [ModalComponent,CustomButtonComponent,CommonModule],
  templateUrl: './exit-icon-button.component.html',
  styleUrl: './exit-icon-button.component.css'
})
export class ExitIconButtonComponent {
  private readonly store: Store = inject(Store);
  @Input() size: "" | "medium" = "";
  stateModal = false;

  openModal() {
    this.stateModal = true;
    document.body.classList.add('without-overflow');
  }

  closeModal() {
    this.stateModal = false;
    document.body.classList.remove('without-overflow');
  }

  redirect() {
    this.store.dispatch(GAME_ACTIONS.restartGamesValues())
    this.closeModal();
  }
}
