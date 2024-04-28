import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { PLAYERS_ACTIONS } from './players.actions';
import { NgrxTestService } from '../../core/services/ngrx-test.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class PlayersEffects {
  private readonly _actions$ = inject(Actions);
  private readonly _ngrxTestService = inject(NgrxTestService);

  //TODO Eliminar tap
  //TODO Eliminar NgrxTestService e implementar servicio final
  public loadPlayers$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(PLAYERS_ACTIONS.loadPlayers),
      tap(() => console.log('effect players init')),
      exhaustMap(() =>
        this._ngrxTestService.executeNgrxPlayersTest().pipe(
          map(res => PLAYERS_ACTIONS.updatePlayers({ players: res })),
          catchError(({ message }: HttpErrorResponse) =>
            of(PLAYERS_ACTIONS.loadPlayersFailure({ error: message }))
          ),
          tap({ complete: () => console.log('effects finished') })
        )
      )
    );
  });
}
