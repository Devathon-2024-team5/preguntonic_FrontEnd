import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { IPlayersState } from '../models/IPlayers.state';

export const selectPlayersFeature = (state: AppState) => state.playersState;

const selectPlayers = createSelector(
  selectPlayersFeature,
  (state: IPlayersState) => state.players
);

const selectPlayersIsLoading = createSelector(
  selectPlayersFeature,
  (state: IPlayersState) => state.isLoading
);

const selectPlayersError = createSelector(
  selectPlayersFeature,
  (state: IPlayersState) => state.error
);

const selectPlayersCurrent = createSelector(
  selectPlayersFeature,
  (state: IPlayersState) => state.currentPlayer
);

export const PLAYERS_SELECTS = {
  selectPlayers,
  selectPlayersIsLoading,
  selectPlayersError,
  selectPlayersCurrent
}
