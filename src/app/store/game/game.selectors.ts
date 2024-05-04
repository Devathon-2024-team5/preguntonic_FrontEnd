import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { IGameState } from '../models/IGame.state';
import { GameConfigDTO } from '../types/store.dto';

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

const selectConfigGame = createSelector(
  selectGameFeature,
  (state: IGameState): GameConfigDTO => ({
    numOfQuestion: state.numOfQuestion,
    maxPlayers: state.maxPlayers,
  })
);

export const GAME_SELECTORS = {
  selectQuestions,
  selectLoadGame,
  selectGameError,
  selectCurrentQuestion,
  selectConfigGame
};
