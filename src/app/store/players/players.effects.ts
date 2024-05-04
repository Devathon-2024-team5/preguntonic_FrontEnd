import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { PLAYERS_ACTIONS } from './players.actions';
import { NgrxTestService } from '../../core/services/ngrx-test.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpService } from '../../core/services/http.service';
import { Store } from '@ngrx/store';

@Injectable()
export class PlayersEffects {
  private readonly _actions$ = inject(Actions);
  private readonly _ngrxTestService = inject(NgrxTestService);
  private readonly _http = inject(HttpService);
  private readonly store = inject(Store);

  //TODO Eliminar tap
  //TODO Eliminar NgrxTestService e implementar servicio final
  public loadPlayers$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(PLAYERS_ACTIONS.loadPlayers),
      exhaustMap(() =>
        this._ngrxTestService.executeNgrxPlayersTest().pipe(
          map(res => PLAYERS_ACTIONS.updatePlayers({ players: res })),
          catchError(({ message }: HttpErrorResponse) =>
            of(PLAYERS_ACTIONS.loadPlayersFailure({ error: message }))
          )
        )
      )
    );
  });

  // public createPlayer$ = createEffect(() => {
  //   return this._actions$.pipe(
  //     ofType(GAME_ACTIONS.setRoomCode),
  //     exhaustMap(({roomCode}) =>
  //       this.store.select(CURRENT_PLAYER_SELECTS.selectCurrentPlayer).pipe(
  //         switchMap(player => this._http.createPlayer(player, roomCode)),
  //         map(({ ok, body }) => {
  //           if (!ok) throw new Error(`Failure to retrieve data`);

  //           console.log(body);
  //           return GAME_ACTIONS.changeView({route: ''});
  //         }),
  //         catchError(({ message }: HttpErrorResponse) =>
  //           of(PLAYERS_ACTIONS.loadPlayersFailure({ error: message }))
  //         )
  //       )
  //     )
  //   )
  // })
}
