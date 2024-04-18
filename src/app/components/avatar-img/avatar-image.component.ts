import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CustomButtonComponent } from '../custom-btn/custom-button.component';

@Component({
  selector: 'app-avatar-image',
  standalone: true,
  imports: [CustomButtonComponent],
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './avatar-image.component.html',
  styleUrl: './avatar-image.component.css'
})
export class AvatarImageComponent implements OnInit {
  @Input() images: string[] = [];
  @Output() avatarSelected: EventEmitter<string> = new EventEmitter<string>();
  avatar : string = this.images[0];
  currentIndex: number = 1;

  ngOnInit() {
    // Verificar si hay imágenes disponibles
    if (this.images.length > 0) {
      // Asignar la primera imagen como avatar
      this.avatar = this.images[this.currentIndex];
      // Emitir la primera imagen como avatar seleccionado
      this.avatarSelected.emit(this.avatar);
    }
  }

  handlerClick(){
    if (this.images.length > 0) {
      // Actualizamos el avatar con el elemento correspondiente al índice actual
      this.avatar = this.images[this.currentIndex];

      // Incrementamos el índice, asegurándonos de volver al inicio si llegamos al final del array
      this.currentIndex = (this.currentIndex + 1) % this.images.length;

      // Emitir el nuevo avatar seleccionado
      this.avatarSelected.emit(this.avatar);
    }
  }

  selectAvatar(image: string) {
    this.avatarSelected.emit(image); // Emitir el valor de la imagen seleccionada
  }
}
