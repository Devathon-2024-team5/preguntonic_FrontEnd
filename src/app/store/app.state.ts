import { ActionReducerMap } from '@ngrx/store';
import { playersReducers } from './players/players.reducers';
import { IPlayersState } from './models/IPlayers.state';
import { PlayersEffects } from './players/players.effects';

export const AllEffects = [PlayersEffects];

export interface AppState {
  playersState: IPlayersState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  playersState: playersReducers,
};
