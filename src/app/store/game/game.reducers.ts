import { createReducer, on } from '@ngrx/store';
import { IGameState, IQuestion } from '../models/IGame.state';
import { GAME_ACTIONS } from './game.actions';

export const initialState: IGameState = {
  maxPlayers: 0,
  numOfQuestions: 0,
  question: {} as IQuestion,
  currentQuestion: 0,
  roomCode: '',
  error: null,
  isLoading: false,
};

export const gameReducer = createReducer(
  initialState,
  on(
    GAME_ACTIONS.loadGame,
    (state): IGameState => ({ ...state, isLoading: true })
  ),
  on(
    GAME_ACTIONS.updateQuestion,
    (state, { currentQuestion, question }): IGameState => ({
      ...state,
      currentQuestion,
      question: question,
      isLoading: false,
    })
  ),
  on(
    GAME_ACTIONS.loadGameFailure,
    (state, { error }): IGameState => ({ ...state, error, isLoading: false })
  ),
  on(
    GAME_ACTIONS.setConfigGame,
    (state, { maxPlayers, numOfQuestions }): IGameState => ({
      ...state,
      numOfQuestions,
      maxPlayers,
    })
  ),
  on(
    GAME_ACTIONS.setRoomCode,
    (state, { roomCode }): IGameState => ({ ...state, roomCode })
  )
);
