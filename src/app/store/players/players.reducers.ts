import { createReducer, on } from '@ngrx/store';
import { PlayersActions } from './players.actions';
import { IPlayersState } from '../models/IPlayers.state';

const initialState: IPlayersState = {
  players: [],
  currentPlayer: null,
  isLoading: false,
  error: null,
};

export const playersReducers = createReducer(
  initialState,
  on(
    PlayersActions.loadPlayers,
    (state): IPlayersState => ({ ...state, isLoading: true })
  ),
  on(
    PlayersActions.updatePlayers,
    (state, { players }): IPlayersState => ({ ...state, players })
  ),
  on(PlayersActions.loadPlayersFailure, (state, { error }): IPlayersState => ({
    ...state,
    error,
  }))
);
