import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { IGameState } from '../models/IGame.state';

export const selectGameFeature = (state: AppState) => state.gameState;

const selectLoadGame = createSelector(
  selectGameFeature,
  (state: IGameState) => state.isLoading
);

const selectQuestions = createSelector(
  selectGameFeature,
  (state: IGameState) => state.questions
);

const selectGameError = createSelector(
  selectGameFeature,
  (state: IGameState) => state.error
);

const selectCurrentQuestion = createSelector(
  selectGameFeature,
  (state: IGameState) => state.currentQuestion
);

export const GAME_SELECTORS = {
  selectQuestions,
  selectLoadGame,
  selectGameError,
  selectCurrentQuestion,
};
