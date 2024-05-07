import { createReducer, on } from '@ngrx/store';
import { CURRENT_PLAYER_ACTIONS } from './current-player.action';
import { ICurrentPlayerState } from '../models/ICurrentPlayer.state';

const initialState: ICurrentPlayerState = {
  avatar: '',
  playerName: '',
  playerId: '',
  score: 0,
};

export const currentPlayerReducer = createReducer(
  initialState,
  on(
    CURRENT_PLAYER_ACTIONS.saveCurrentPlayer,
    (state, { avatar, playerName, playerId }): ICurrentPlayerState => ({
      ...state,
      avatar,
      playerName,
      playerId: playerId ?? 'nada',
    })
  ),
  on(
    CURRENT_PLAYER_ACTIONS.updateScore,
    (state, { score }): ICurrentPlayerState => ({ ...state, score: score })
  )
);
