import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-logo-title',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './logoTitle.component.html',
  styleUrl: './logoTitle.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoTitleComponent {}
