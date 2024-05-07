import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { GAME_ACTIONS } from './game.actions';
import { HttpService } from '../../core/services/http.service';
import { Router } from '@angular/router';
import { WebSocketApiService } from '../../core/services/web-socket-api.service';
import { Store } from '@ngrx/store';
import { concatLatestFrom } from '@ngrx/operators';
import { CURRENT_PLAYER_SELECTS } from '../current-player/current-player.selectors';
import { GAME_SELECTORS } from './game.selectors';
import { ModalService } from '../../shared/services/modal.service';

@Injectable()
export class GameEffects {
  private readonly _actions$ = inject(Actions);
  private readonly _httpService = inject(HttpService);
  private readonly _router = inject(Router);
  private readonly webSocketApi = inject(WebSocketApiService);
  private readonly store = inject(Store);
  private readonly modalService: ModalService = inject(ModalService);

  public setConfigGame$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(GAME_ACTIONS.setConfigGame),
      exhaustMap(({ maxPlayers, numOfQuestions }) =>
        this._httpService.createRoom({ maxPlayers, numOfQuestions }).pipe(
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
        tap(([{ roomCode }, { playerName, avatar, playerId }]) => {
          if (playerId === null) throw new Error('');
          return this.webSocketApi._connect(
            roomCode,
            playerName,
            avatar,
            playerId
          );
        })
      );
    },
    { dispatch: false }
  );

  public connectToQuestions$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(GAME_ACTIONS.connectToQuestions),
        concatLatestFrom(() => [
          this.store.select(CURRENT_PLAYER_SELECTS.selectCurrentPlayer),
          this.store.select(GAME_SELECTORS.selectRoomCode),
        ]),
        tap(([_, { playerId }, roomCode]) => {
          console.log(playerId + roomCode);
          if (playerId === null) throw new Error('');

          this.webSocketApi.joinPlayerGame(roomCode, playerId);
        })
      );
    },
    { dispatch: false }
  );

  public redirectToRoom$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(GAME_ACTIONS.changeView),
        tap(({ route, queryParams }) => {
          console.log(route),
            this._router.navigate([route], {
              queryParams,
            });
        })
      );
    },
    { dispatch: false }
  );

  public changeStatus$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(GAME_ACTIONS.changeStatus),
        concatLatestFrom(() =>
          this.store.select(CURRENT_PLAYER_SELECTS.selectCurrentPlayer)
        ),
        tap(([{ roomCode }, { playerId }]) => {
          if (playerId === null) throw new Error('');

          return this.webSocketApi.readyPlayer(roomCode, playerId);
        })
      );
    },
    { dispatch: false }
  );

  public sendResponse$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(GAME_ACTIONS.sendResponse),
        concatLatestFrom(() => [
          this.store.select(GAME_SELECTORS.selectRoomCode),
          this.store.select(CURRENT_PLAYER_SELECTS.selectCurrentPlayer),
          this.store.select(GAME_SELECTORS.selectTime),
        ]),
        tap(([{ answerId, idQuestion }, roomCode, { playerId }, time]) => {
          if (playerId === null || time === undefined) throw new Error('');
          console.log(playerId, time);

          // this.modalService.toggleViewModal();
          const isTimeout = time === 0;
          this.webSocketApi.responseQuestion(
            answerId,
            idQuestion,
            playerId,
            roomCode,
            time,
            isTimeout
          );
        })
      );
    },
    { dispatch: false }
  );

  // public saveResult$ = createEffect(
  //   () => {
  //     return this._actions$.pipe(
  //       ofType(GAME_ACTIONS.saveResults),
  //       tap(() =>{ 
  //         console.log('--------------------------------------');
          
  //         this._router.navigateByUrl('/results-room/previous-result')
  //       })
  //     );
  //   },
  //   { dispatch: false }
  // );

  // tap(() =>
  //   GAME_ACTIONS.changeView({ route: '/results-room/previous-result' }),
  //   catchError(error => of(GAME_ACTIONS.loadGameFailure({ error })))
  // )

  public nextQuestion$ = createEffect(() => {
    return this._actions$
      .pipe(
        ofType(GAME_ACTIONS.nextQuestion),
        concatLatestFrom(() => [
          this.store.select(GAME_SELECTORS.selectRoomCode),
          this.store.select(CURRENT_PLAYER_SELECTS.selectCurrentPlayer),
        ]),
        tap(([_, roomCode, { playerId }]) => {
          if (playerId === null) throw new Error('');

          this.webSocketApi.nextQuestion(playerId, roomCode);
        })
      )
      .pipe(
        map(() => GAME_ACTIONS.changeView({ route: '/game-room' })),
        catchError(error => of(GAME_ACTIONS.loadGameFailure({ error })))
      );
  });
}
