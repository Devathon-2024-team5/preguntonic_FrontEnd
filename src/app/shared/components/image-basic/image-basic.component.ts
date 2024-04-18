import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IImageData } from '../../../core/models/IImageData.interface';

@Component({
  selector: 'app-image-basic',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './image-basic.component.html',
  styleUrl: './image-basic.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageBasicComponent {
  customStyles = input<Record<string, string>>();
  size = input<number>(4);
  imageParameters = input.required<IImageData>();
}
