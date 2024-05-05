import { Component, Input, OnInit } from '@angular/core';
import { AnteroomComponent } from '../../anteroom.component';

@Component({
  selector: 'app-section-player',
  standalone: true,
  imports: [AnteroomComponent],
  templateUrl: './section-player.component.html',
  styleUrl: './section-player.component.css'
})
export class SectionPlayerComponent implements OnInit {
  @Input() avatar: string = "";
  @Input() playerName: string = "";

  ngOnInit(): void {
    console.log(this.avatar);

  }
}
