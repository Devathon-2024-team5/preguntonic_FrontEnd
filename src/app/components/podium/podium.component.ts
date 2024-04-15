import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ImageBasicComponent } from '../../shared/components/imageBasic/ImageBasic.component';

//TODO add canvas-confetti library and implements winners' information
@Component({
  selector: 'app-podium',
  standalone: true,
  templateUrl: './podium.component.html',
  styleUrl: './podium.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ImageBasicComponent],
})
export class PodiumComponent {
  readonly podiumSteps = ['100', '80', '60'];
}
