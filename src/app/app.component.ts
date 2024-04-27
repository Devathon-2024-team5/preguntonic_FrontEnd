import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarDailyComponent } from './components/navbar-daily/navbar-daily.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarDailyComponent, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'preguntonic_frontEnd';
}
