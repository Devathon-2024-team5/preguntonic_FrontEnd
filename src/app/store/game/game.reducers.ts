import { createReducer, on } from '@ngrx/store';
import { IGameState } from '../models/IGame.state';
import { GAME_ACTIONS } from './game.actions';

export const initialState: IGameState = {
  maxPlayers: 0,
  numOfQuestion: 0,
  questions: [],
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
    (state, { currentQuestion, questions }): IGameState => ({
      ...state,
      currentQuestion,
      questions: [...state.questions, ...questions],
      isLoading: false,
    })
  ),
  on(
    GAME_ACTIONS.loadGameFailure,
    (state, { error }): IGameState => ({ ...state, error, isLoading: false })
  ),
  on(
    GAME_ACTIONS.setConfigGame,
    (state, { maxPlayers, numOfQuestion }): IGameState => ({
      ...state,
      numOfQuestion,
      maxPlayers,
    })
  ),
  on(
    GAME_ACTIONS.setRoomCode,
    (state, { roomCode }): IGameState => ({ ...state, roomCode })
  )
);
