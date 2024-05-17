import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { concatMap, exhaustMap, map } from 'rxjs';
import { HttpService } from '../../core/services/http.service';
import { Store } from '@ngrx/store';
import { GAME_ACTIONS } from '../game/game.actions';
import { CURRENT_PLAYER_SELECTS } from './current-player.selectors';
import { CURRENT_PLAYER_ACTIONS } from './current-player.action';

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
      exhaustMap(([{ roomCode }, { avatar, playerName }]) =>
        this._httpService.createPlayer({ avatar, playerName }, roomCode).pipe(
          map(({ ok, body }) => {
            if (!ok) throw new Error(`Failure to retrieve data`);

            return CURRENT_PLAYER_ACTIONS.saveCurrentPlayer({
              avatar: body?.avatar ?? '',
              playerName: body?.playerName ?? '',
              playerId: body?.playerId ?? '',
            });
          }),
          concatMap(action => [
            action,
            GAME_ACTIONS.changeView({
              route: '/anteroom',
              queryParams: { room_code: roomCode },
            }),
          ])
        )
      )
    );
  });
}
