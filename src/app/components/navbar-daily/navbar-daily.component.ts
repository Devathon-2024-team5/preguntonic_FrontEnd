import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-navbar-daily',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './navbar-daily.component.html',
  styleUrl: './navbar-daily.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarDailyComponent { }
