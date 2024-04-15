import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IImageData } from '../../../core/models/IImageData.interface';

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './ImageBasic.component.html',
  styleUrl: './ImageBasic.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageBasicComponent {
  customStyles = input<Record<string, string>>();
  size = input<number>(4);
  imageParameters = input.required<IImageData>();
}
