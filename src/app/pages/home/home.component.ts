import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { LogoTitleComponent } from '../../shared/components/logo-title/logo-title.component';
import { AvatarImageComponent } from '../../shared/components/avatar-img/avatar-image.component';
import { CustomButtonComponent } from '../../shared/components/custom-btn/custom-button.component';
import { HttpRoomService } from '../../shared/services/http.room.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

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
export class HomeComponent implements OnInit {
  player: Player[] = [];
  httpService = inject(HttpRoomService);
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

  ngOnInit(): void {
    console.log('s');

    console.log(this.route.paramMap);
  }
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
        max_players: 10,
        num_of_question: 5,
        player_name: this.playerName,
        avatar_id: this.selectedAvatar,
      };
      this.httpService
        .createRoom(RoomPlayer)
        .subscribe(res => {
          console.log(res);

          this.router.navigate(['/anteroom'], {
            queryParams: { room_code: res['room_code'] },
          });
        });
    } else {
      // Mostrar una alerta si no se ha ingresado un nombre
      alert('Por favor, ingresa un nombre.');
    }
  }

  joinRoom() {
    
  }
}
