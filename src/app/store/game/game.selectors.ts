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
  (state: IGameState) => state.question
);

const selectCurrentQuestion = createSelector(
  selectGameFeature,
  (state: IGameState) => state.currentQuestion
);

const selectGameError = createSelector(
  selectGameFeature,
  (state: IGameState) => state.error
);

const selectConfigGame = createSelector(
  selectGameFeature,
  (state: IGameState): GameConfigDTO => ({
    numOfQuestions: state.numOfQuestions,
    maxPlayers: state.maxPlayers,
  })
);

const selectRoomCode = createSelector(
  selectGameFeature,
  (state: IGameState): string => state.roomCode
);

const selectTime = createSelector(
  selectGameFeature,
  (state: IGameState) => state.currentQuestion.timeResponse
);

const selectPrevResults = createSelector(
  selectGameFeature,
  (state: IGameState) => state.previousResult
);

export const GAME_SELECTORS = {
  selectQuestions,
  selectLoadGame,
  selectGameError,
  selectCurrentQuestion,
  selectConfigGame,
  selectRoomCode,
  selectTime,
  selectPrevResults,
};
