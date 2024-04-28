import { createReducer, on } from '@ngrx/store';
import { PLAYERS_ACTIONS } from './players.actions';
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
    PLAYERS_ACTIONS.loadPlayers,
    (state): IPlayersState => ({ ...state, isLoading: true })
  ),
  on(
    PLAYERS_ACTIONS.updatePlayers,
    (state, { players }): IPlayersState => ({
      ...state,
      isLoading: false,
      players,
    })
  ),
  on(
    PLAYERS_ACTIONS.loadPlayersFailure,
    (state, { error }): IPlayersState => ({
      ...state,
      isLoading: false,
      error,
    })
  )
);
