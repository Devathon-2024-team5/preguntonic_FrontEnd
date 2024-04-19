import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LogoTitleComponent } from '../../shared/components/logo-title/logo-title.component';
import { AvatarImageComponent } from '../../components/avatar-img/avatar-image.component';
import { CustomButtonComponent } from '../../components/custom-btn/custom-button.component';
import { HttpService } from '../../shared/services/http.service';
import { Router } from '@angular/router';

export interface Player {
  id?: number;
  avatar: string;
  name: string;
  estado?: boolean;
}

export interface RoomPlayer {
  max_players: number;
  num_of_question: number;
  player_name: string;
  avatar_id: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './home.component.css',
  imports: [CustomButtonComponent, LogoTitleComponent, AvatarImageComponent],
})
export class HomeComponent {
  player: Player[] = [];
  httpService = inject(HttpService);
  router = inject(Router);

  avatarImages: string[] = [
    '../../../assets/avatar-1.webp',
    '../../../assets/avatar-2.webp',
    '../../../assets/avatar-3.webp',
    '../../../assets/avatar-4.webp',
  ];
  selectedAvatar: string = '';
  playerName: string = '';

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

      const RoomPlayer: RoomPlayer = {
        max_players: 4,
        num_of_question: 5,
        player_name: this.playerName,
        avatar_id: this.selectedAvatar,
      };
      this.httpService
        .connect('http://localhost:8080/v1/rooms', RoomPlayer)
        .subscribe(res => {
          console.log(res);
          this.router.navigate(['/anteroom']);
        });
    } else {
      // Mostrar una alerta si no se ha ingresado un nombre
      alert('Por favor, ingresa un nombre.');
    }
  }


}
