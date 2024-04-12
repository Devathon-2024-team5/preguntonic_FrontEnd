import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProgressBarComponent } from './components/progressBar/progressBar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProgressBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'preguntonic_frontEnd';
}
