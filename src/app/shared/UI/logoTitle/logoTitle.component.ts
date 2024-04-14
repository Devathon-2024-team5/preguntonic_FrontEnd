import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ILogoDimensions } from '../../../core/models/ILogoDimensions.interface';

@Component({
  selector: 'app-logo-title',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './logoTitle.component.html',
  styleUrl: './logoTitle.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoTitleComponent {
  dimensions = input<ILogoDimensions>({
    width: 100,
    height: 50,
  })
}
