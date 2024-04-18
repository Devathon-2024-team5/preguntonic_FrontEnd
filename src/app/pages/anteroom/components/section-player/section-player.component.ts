import { Component } from '@angular/core';
import { AnteroomComponent } from '../../anteroom.component';

@Component({
  selector: 'app-section-player',
  standalone: true,
  imports: [AnteroomComponent],
  templateUrl: './section-player.component.html',
  styleUrl: './section-player.component.css'
})
export class SectionPlayerComponent {
  avatar: string = "";
  playerName: string = "";
  constructor(private anteRoom : AnteroomComponent){
    this.avatar = anteRoom.avatar
    this.playerName = anteRoom.playerName

  }
}
