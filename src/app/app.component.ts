import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarDailyComponent } from './components/navbar-daily/navbar-daily.component';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { GAME_SELECTORS } from './store/game/game.selectors';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.state';
import { GAME_ACTIONS } from './store/game/game.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarDailyComponent, AsyncPipe, JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'preguntonic_frontEnd';
  private readonly store: Store<AppState> = inject(Store);
  questions$ = this.store.select(GAME_SELECTORS.selectQuestions);
  isLoading$ = this.store.select(GAME_SELECTORS.selectLoadGame);
  indexCurrentQuestion$ = this.store.select(
    GAME_SELECTORS.selectCurrentQuestion
  );
  gameError$ = this.store.select(GAME_SELECTORS.selectGameError);

  ngOnInit(): void {
    // this.store.dispatch(GAME_ACTIONS.loadGame());
  }

  public callApi() {
    this.store.dispatch(GAME_ACTIONS.loadGame());
  }
}
