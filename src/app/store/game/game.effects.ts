import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { NgrxTestService } from '../../core/services/ngrx-test.service';
import { HttpErrorResponse } from '@angular/common/http';
import { GAME_ACTIONS } from './game.actions';

@Injectable()
export class GameEffects {
  private readonly _actions$ = inject(Actions);
  private readonly _ngrxTestService = inject(NgrxTestService);

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
}
