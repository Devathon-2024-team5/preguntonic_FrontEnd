import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-logo-title',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './logo-title.component.html',
  styleUrl: './logo-title.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoTitleComponent {}
