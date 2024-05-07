import { createReducer, on } from '@ngrx/store';
import { ICurrentQuestion, IGameState, IQuestion } from '../models/IGame.state';
import { GAME_ACTIONS } from './game.actions';

export const initialState: IGameState = {
  maxPlayers: 0,
  numOfQuestions: 0,
  question: {} as IQuestion,
  currentQuestion: {} as ICurrentQuestion,
  roomCode: '',
  error: null,
  isLoading: false,
  previousResult: {
    correct_answer_id: '',
    correct_answer: '',
    players: [],
    question: {
      answers: [],
      ordinal: 0,
      question: '',
    },
  }
};

export const gameReducer = createReducer(
  initialState,
  on(
    GAME_ACTIONS.loadGame,
    (state): IGameState => ({ ...state, isLoading: true })
  ),
  on(
    GAME_ACTIONS.updateQuestion,
    (state, { question }): IGameState => ({
      ...state,
      currentQuestion: question,
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
  ),
  on(
    GAME_ACTIONS.saveTimeResponse,
    (state, { time }): IGameState => ({
      ...state,
      currentQuestion: { ...state.currentQuestion, timeResponse: time },
    })
  ),
  on(
    GAME_ACTIONS.saveResults,
    (state, { result }): IGameState => ({
      ...state,
      previousResult: structuredClone(result.previousResult),
    })
  )
);
