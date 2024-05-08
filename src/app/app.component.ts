import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
<<<<<<< Updated upstream
import { NavbarDailyComponent } from './components/navbar-daily/navbar-daily.component';
import { AsyncPipe, JsonPipe } from '@angular/common';

=======
import { GameRoomComponent } from './Pages/game-room/game-room.component';
import { ResultsRoomComponent } from './Pages/results-room/results-room.component';
>>>>>>> Stashed changes

@Component({
  selector: 'app-root',
  standalone: true,
<<<<<<< Updated upstream
  imports: [RouterOutlet, NavbarDailyComponent, AsyncPipe, JsonPipe],
=======
  imports: [RouterOutlet, GameRoomComponent, ResultsRoomComponent],
>>>>>>> Stashed changes
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'preguntonic_frontEnd';
}
