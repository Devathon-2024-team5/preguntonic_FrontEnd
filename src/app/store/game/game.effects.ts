import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { exhaustMap, map, mergeMap, retry, tap } from 'rxjs';
import { GAME_ACTIONS } from './game.actions';
import { HttpService } from '../../core/services/http.service';
import { Router } from '@angular/router';
import { WebSocketApiService } from '../../core/services/web-socket-api.service';
import { Store } from '@ngrx/store';
import { concatLatestFrom } from '@ngrx/operators';
import { CURRENT_PLAYER_SELECTS } from '../current-player/current-player.selectors';
import { GAME_SELECTORS } from './game.selectors';
import { CURRENT_PLAYER_ACTIONS } from '../current-player/current-player.action';
import { PLAYERS_ACTIONS } from '../players/players.actions';

@Injectable()
export class GameEffects {
  private readonly _actions$ = inject(Actions);
  private readonly _httpService = inject(HttpService);
  private readonly _router = inject(Router);
  private readonly webSocketApi = inject(WebSocketApiService);
  private readonly store = inject(Store);

  public setConfigGame$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(GAME_ACTIONS.setConfigGame),
      exhaustMap(({ maxPlayers, numOfQuestions }) =>
        this._httpService.createRoom({ maxPlayers, numOfQuestions }).pipe(
          map(({ body, ok }) => {
            if (!ok) throw new Error(`Failure to retrieve data`);

            return GAME_ACTIONS.setRoomCode({ roomCode: body['room_code'] });
          })
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
          if (playerId === null || time === undefined)
            throw new Error('Error al enviar la respuesta');

          const isTimeout = time === 0;
          this.webSocketApi.responseQuestion(
            answerId,
            idQuestion,
            playerId,
            roomCode,
            time,
            isTimeout
          );
        }),
        retry(3)
      );
    },
    { dispatch: false }
  );

  public saveResult$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(GAME_ACTIONS.saveResults),
      concatLatestFrom(() =>
        this.store.select(CURRENT_PLAYER_SELECTS.selectCurrentPlayer)
      ),
      map(([{ result }, { playerId }]) => {
        const player = result.previousResult.players.find(
          p => p.id === playerId
        );
        return CURRENT_PLAYER_ACTIONS.updateScore({ score: player!.score });
      })
    );
  });

  public nextQuestion$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(GAME_ACTIONS.nextQuestion),
      concatLatestFrom(() => [
        this.store.select(GAME_SELECTORS.selectRoomCode),
        this.store.select(CURRENT_PLAYER_SELECTS.selectCurrentPlayer),
      ]),
      map(([_, roomCode, { playerId }]) => {
        if (playerId === null) throw new Error('aqui');

        this.webSocketApi.nextQuestion(playerId, roomCode);
        return GAME_ACTIONS.changeView({ route: '/game-room' });
      })
    );
  });

  public restartGamesValues = createEffect(() => {
    return this._actions$.pipe(
      ofType(GAME_ACTIONS.restartGamesValues),
      tap(() => this.webSocketApi._disconnect()),
      mergeMap(() => [
        GAME_ACTIONS.changeView({ route: '/home' }),
        CURRENT_PLAYER_ACTIONS.resetCurrentPlayer(),
        PLAYERS_ACTIONS.resetPlayers(),
      ])
    );
  });
}
