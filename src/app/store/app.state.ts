import { ActionReducerMap } from '@ngrx/store';
import { IPlayersState } from './models/IPlayers.state';
import { IGameState } from './models/IGame.state';
import { gameReducer } from './game/game.reducers';
import { playersReducers } from './players/players.reducers';
import { PlayersEffects } from './players/players.effects';
import { GameEffects } from './game/game.effects';

export const AllEffects = [PlayersEffects, GameEffects];

export interface AppState {
  playersState: IPlayersState;
  gameState: IGameState
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  playersState: playersReducers,
  gameState: gameReducer
};
