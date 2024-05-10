import { createAction, props } from '@ngrx/store';

const saveCurrentPlayer = createAction(
  '[Home Page] Save Current Player',
  props<{ avatar: string; playerName: string, playerId?: string }>()
);
const setupPlayer = createAction(
  '[Home Page] Set Up Player',
  props<{ avatar: string; playerName: string }>()
);

const getCurrentPlayer = createAction('[Home Page] Get Current Player');

const updateScore = createAction(
  '[Home Page] Update Score',
  props<{ score: number }>()
)

const resetCurrentPlayer = createAction('[Home Page] Reset Current Player');

export const CURRENT_PLAYER_ACTIONS = {
  saveCurrentPlayer,
  getCurrentPlayer,
  setupPlayer,
  updateScore,
  resetCurrentPlayer
};
