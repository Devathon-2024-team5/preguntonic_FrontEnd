import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { NgrxTestService } from '../../core/services/ngrx-test.service';
import { HttpErrorResponse } from '@angular/common/http';
import { GAME_ACTIONS } from './game.actions';
import { HttpService } from '../../core/services/http.service';
import { Router } from '@angular/router';

@Injectable()
export class GameEffects {
  private readonly _actions$ = inject(Actions);
  private readonly _ngrxTestService = inject(NgrxTestService);
  private readonly _httpService = inject(HttpService);
  private readonly _router = inject(Router);

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

  public setConfig$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(GAME_ACTIONS.setConfigGame),
      exhaustMap(({ maxPlayers, numOfQuestion }) =>
        this._httpService.createRoom({ maxPlayers, numOfQuestion }).pipe(
          map(({ ok, body }) => {
            if (!ok) throw new Error(`Failure to retrieve data`);

            return GAME_ACTIONS.setRoomCode(body['room_code']);
          }),
          catchError(({ message }: HttpErrorResponse) =>
            of(GAME_ACTIONS.loadGameFailure({ error: message }))
          )
        )
      )
    );
  });


  public redirectToRoom$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(GAME_ACTIONS.changeView),
        tap(({route}) => this._router.navigate([route]))
      );
    },
    { dispatch: false }
  );
}
