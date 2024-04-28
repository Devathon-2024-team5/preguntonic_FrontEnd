import { Component, Input } from '@angular/core';
import { AnteroomComponent } from '../../anteroom.component';

@Component({
  selector: 'app-section-player',
  standalone: true,
  imports: [AnteroomComponent],
  templateUrl: './section-player.component.html',
  styleUrl: './section-player.component.css'
})
export class SectionPlayerComponent {
  @Input() avatar: string = "";
  @Input() playerName: string = "";
  constructor(){

  }
}
