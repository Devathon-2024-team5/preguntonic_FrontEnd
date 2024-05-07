import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ImageBasicComponent } from '../../shared/components/image-basic/image-basic.component';
import { AsyncPipe } from '@angular/common';
import { AvatarWithFrameComponent } from '../../shared/components/avatar-with-frame/avatar-with-frame.component';
import { IPlayerInGame } from '../../store/models/IPlayers.state';

@Component({
  selector: 'app-player-results',
  standalone: true,
  imports: [AvatarWithFrameComponent,ImageBasicComponent, AsyncPipe],
  templateUrl: './player-results.component.html',
  styleUrl: './player-results.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerResultsComponent {
  player = input.required<IPlayerInGame>()
}
