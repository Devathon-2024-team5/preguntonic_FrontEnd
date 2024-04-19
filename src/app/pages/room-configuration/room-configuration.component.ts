import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-room-configuration',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './room-configuration.component.html',
  styleUrl: './room-configuration.component.css'
})
export class RoomConfigurationComponent {
  valuesNumberOfPlayers = [2,3,4,5,6,7,8];
  valuesNumberOfQuestions = [5,10,15,20,25,30];

  numberOfPlayersInTheRoom = this.valuesNumberOfPlayers[0];
  numberOfGameQuestions = this.valuesNumberOfQuestions[0];
}
