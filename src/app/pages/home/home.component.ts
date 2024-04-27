import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { LogoTitleComponent } from '../../shared/components/logo-title/logo-title.component';
import { AvatarImageComponent } from '../../shared/components/avatar-img/avatar-image.component';
import { CustomButtonComponent } from '../../shared/components/custom-btn/custom-button.component';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

export interface Player {
  id?: number;
  avatar: string;
  name: string;
  estado?: boolean;
}

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrl: './home.component.css',
    imports: [CustomButtonComponent, LogoTitleComponent, AvatarImageComponent]
})
export class HomeComponent  {
  player: Player[] = [];
  router = inject(Router);

  avatarImages: string[] = [
    '../../../assets/avatar-1.webp',
    '../../../assets/avatar-2.webp',
    '../../../assets/avatar-3.webp',
    '../../../assets/avatar-4.webp',
  ];
  selectedAvatar: string = '';
  playerName: string = '';
  route: ActivatedRoute = inject(ActivatedRoute);

  
  constructor() {}

  selectAvatar(avatar: string) {
    this.selectedAvatar = avatar;
  }

  onNameInputChange(event: Event) {
    // Utiliza la interfaz HTMLInputElement para asegurar que event.target es un input element
    const inputElement = event.target as HTMLInputElement;
    this.playerName = inputElement.value;
  }
  
  createRoom() {
    // Verificar si se ha ingresado un nombre
    if (this.playerName.trim() !== '') {
      // Crear el objeto JSON con la información capturada
      const playerData: Player = {
        avatar: this.selectedAvatar,
        name: this.playerName,
      };
      // Agregar el objeto JSON a la matriz player
      this.player.push(playerData);
      // Imprimir el objeto JSON en consola
      console.log(playerData);
      this.router.navigate(['/room-configuration'], {
        queryParams: {
          playerName: this.playerName,
          avatarId: this.selectedAvatar
        }
      });

    } else {
      // Mostrar una alerta si no se ha ingresado un nombre
      alert('Por favor, ingresa un nombre.');
    }
  }

  joinRoom() {
    
  }
}
