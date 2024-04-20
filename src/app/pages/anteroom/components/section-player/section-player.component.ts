import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { AnteroomComponent } from '../../anteroom.component';

@Component({
  selector: 'app-section-player',
  standalone: true,
  imports: [AnteroomComponent],
  templateUrl: './section-player.component.html',
  styleUrl: './section-player.component.css'
})
export class SectionPlayerComponent implements OnChanges {
  avatar: string = "";
  playerName: string = "";
  constructor(private anteRoom : AnteroomComponent){
    this.avatar = anteRoom.avatar
    this.playerName = anteRoom.playerName
    
    // TODO: We need to get the player name and avatar from the parent component
    const player = localStorage.getItem('player');
    this.avatar = player ? JSON.parse(player).avatar : this.avatar;
    this.playerName = player ? JSON.parse(player).name : this.playerName;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['avatar']) {
      this.avatar = changes['avatar'].currentValue;
    }
    if (changes['playerName']) {
      this.playerName = changes['playerName'].currentValue;
    }
  }
}
