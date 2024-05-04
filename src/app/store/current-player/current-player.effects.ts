import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { catchError, exhaustMap, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpService } from '../../core/services/http.service';
import { Store } from '@ngrx/store';
import { GAME_ACTIONS } from '../game/game.actions';
import { CURRENT_PLAYER_SELECTS } from './current-player.selectors';

@Injectable()
export class CurrentPlayerEffect {
  private readonly _actions$ = inject(Actions);
  private readonly _httpService = inject(HttpService);
  private readonly store = inject(Store);

  createPlayer$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(GAME_ACTIONS.setRoomCode),
      concatLatestFrom(() =>
        this.store.select(CURRENT_PLAYER_SELECTS.selectCurrentPlayer)
      ),
      switchMap(([{ roomCode }, { avatar, playerName }]) =>
        this._httpService.createPlayer({ avatar, playerName }, roomCode).pipe(
          tap(() => console.log(roomCode)),
          map(({ ok }) => {
            if (!ok) throw new Error(`Failure to retrieve data`);

            return GAME_ACTIONS.changeView({ route: '/anteroom' });
          }),
          catchError(({ message }: HttpErrorResponse) =>
            of(GAME_ACTIONS.loadGameFailure({ error: message }))
          )
        )
      )
    );
  });
}
