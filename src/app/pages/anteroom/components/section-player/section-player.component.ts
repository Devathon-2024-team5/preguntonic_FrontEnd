import { Component, Input } from '@angular/core';
import { AnteroomComponent } from '../../anteroom.component';
import { AvatarWithFrameComponent } from '../../../../shared/components/avatar-with-frame/avatar-with-frame.component';

@Component({
  selector: 'app-section-player',
  standalone: true,
  imports: [AnteroomComponent,AvatarWithFrameComponent],
  templateUrl: './section-player.component.html',
  styleUrl: './section-player.component.css'
})
export class SectionPlayerComponent {
  @Input() avatar: string = "";
  @Input() playerName: string = "";
}
