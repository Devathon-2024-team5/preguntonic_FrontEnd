import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { NgrxTestService } from '../../core/services/ngrx-test.service';
import { HttpErrorResponse } from '@angular/common/http';
import { GAME_ACTIONS } from './game.actions';
import { HttpService } from '../../core/services/http.service';
import { Router } from '@angular/router';
import { WebSocketApiService } from '../../core/services/web-socket-api.service';
import { Store } from '@ngrx/store';
import { concatLatestFrom } from '@ngrx/operators';
import { CURRENT_PLAYER_SELECTS } from '../current-player/current-player.selectors';

@Injectable()
export class GameEffects {
  private readonly _actions$ = inject(Actions);
  private readonly _ngrxTestService = inject(NgrxTestService);
  private readonly _httpService = inject(HttpService);
  private readonly _router = inject(Router);
  private readonly webSocketApi = inject(WebSocketApiService);
  private readonly store = inject(Store);

  //TODO Eliminar NgrxTestService e implementar servicio final
  public loadGame$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(GAME_ACTIONS.loadGame),
      exhaustMap(() =>
        this._ngrxTestService.executeNgrxGameTest().pipe(
          map(({ currentQuestion, questions }) =>
            GAME_ACTIONS.updateQuestion({ currentQuestion, questions })
          ),
          catchError(({ message }: HttpErrorResponse) =>
            of(GAME_ACTIONS.loadGameFailure({ error: message }))
          )
        )
      )
    );
  });

  public setConfigGame$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(GAME_ACTIONS.setConfigGame),
      exhaustMap(({ maxPlayers, numOfQuestion }) =>
        this._httpService.createRoom({ maxPlayers, numOfQuestion }).pipe(
          map(({ body, ok }) => {
            if (!ok) throw new Error(`Failure to retrieve data`);

            return GAME_ACTIONS.setRoomCode({ roomCode: body['room_code'] });
          }),
          catchError(({ message }: HttpErrorResponse) =>
            of(GAME_ACTIONS.loadGameFailure({ error: message }))
          )
        )
      )
    );
  });

  public connectToTheGame$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(GAME_ACTIONS.connectToTheGame),
        concatLatestFrom(() =>
          this.store.select(CURRENT_PLAYER_SELECTS.selectCurrentPlayer)
        ),
        tap(([{ roomCode }, { playerName, avatar }]) =>
          this.webSocketApi._connect(roomCode, playerName, avatar)
        )
      );
    },
    { dispatch: false }
  );

  public redirectToRoom$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(GAME_ACTIONS.changeView),
        tap(({ route, queryParams }) =>
          this._router.navigate([route], {
            queryParams,
          })
        )
      );
    },
    { dispatch: false }
  );
}
