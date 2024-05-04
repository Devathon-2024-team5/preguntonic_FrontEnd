import { createAction, props } from '@ngrx/store';

const saveCurrentPlayer = createAction(
  '[Home Page] Save Current Player',
  props<{avatar: string, playerName: string }>()
);

const getCurrentPlayer = createAction('[Home Page] Get Current Player');

export const CURRENT_PLAYER_ACTIONS = {
  saveCurrentPlayer,
  getCurrentPlayer,
};
