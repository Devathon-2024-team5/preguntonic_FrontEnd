import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpRoomService } from '../../shared/services/http.room.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HomeComponent } from '../home/home.component';

export interface RoomPlayer {
  max_players: number;
  num_of_question: number;
  player_name: string;
  avatar_id: string;
}

@Component({
  selector: 'app-room-configuration',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, HomeComponent],
  templateUrl: './room-configuration.component.html',
  styleUrl: './room-configuration.component.css',
})
export class RoomConfigurationComponent implements OnInit {
  valuesNumberOfPlayers = [2, 3, 4, 5, 6, 7, 8];
  valuesNumberOfQuestions = [5, 10, 15, 20, 25, 30];
  numberOfPlayersInTheRoom: number = this.valuesNumberOfPlayers[0];
  numberOfGameQuestions: number = this.valuesNumberOfQuestions[0];

  playerName: string = '';
  playerAvatar: string = '';

  httpService = inject(HttpRoomService);
  router = inject(Router);

  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    console.log(this.route.paramMap);
    // Leer los parámetros de la URL
    this.route.queryParams.subscribe(params => {
      this.playerName = params['playerName'];
      this.playerAvatar = params['avatarId'];
    });
  }

  createRoom() {
    // Crear el objeto JSON con la información capturada
    const RoomPlayer: RoomPlayer = {
      max_players: this.numberOfPlayersInTheRoom,
      num_of_question: this.numberOfGameQuestions,
      player_name: this.playerName,
      avatar_id: this.playerAvatar,
    };
    console.log(RoomPlayer)

    this.httpService.createRoom(RoomPlayer).subscribe(res => {
      console.log(res);

      this.router.navigate(['/anteroom'], {
        queryParams: { 
          roomPlayer: JSON.stringify(RoomPlayer),
          room_code: res['room_code']
         },
      });
    });
  }

  joinRoom() {}
}
