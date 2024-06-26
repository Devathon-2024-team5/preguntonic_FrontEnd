import { createAction, props } from '@ngrx/store';
import { ICurrentQuestion, IGameState } from '../models/IGame.state';

const loadGame = createAction('[Game Room] Load Game');

const updateQuestion = createAction(
  '[Game Room] Update Question',
  props<{ question: ICurrentQuestion }>()
);

const setConfigGame = createAction(
  '[Room Configuration] Set Config Game',
  props<{ numOfQuestions: number; maxPlayers: number }>()
);

const loadGameFailure = createAction(
  '[Game Room] Load Game Failure',
  props<{ error: string }>()
);

const setRoomCode = createAction(
  '[Room Configuration] Set Room Code',
  props<{ roomCode: string }>()
);
const createRoom = createAction('[Room Configuration] Create Room');

const changeView = createAction(
  '[All Page] Change View Page',
  props<{ route: string; queryParams?: Record<string, string> }>()
);

const connectToTheGame = createAction(
  '[Anteroom Page] Connect To The Game with webSocket',
  props<{ roomCode: string }>()
);

const connectToQuestions = createAction(
  '[Game Room Page] Connect to topical questions with websocket'
);

const nextQuestion = createAction('[Game Room Page] Next question');

const changeStatus = createAction(
  '[Anteroom Page] Change the current player status',
  props<{ roomCode: string }>()
);

const sendResponse = createAction(
  '[Game Room] Send answer question',
  props<{ answerId: string | null ; idQuestion: string }>()
);

const saveTimeResponse = createAction(
  '[Game Room] Save time response',
  props<{ time: number; isSetTimeout: boolean }>()
);

const saveResults = createAction('[Game Room] Save results',
  props<{result: Pick<IGameState, 'previousResult'>}>()
);

const restartGamesValues = createAction('[Game Room] Restart games values')

export const GAME_ACTIONS = {
  loadGame,
  updateQuestion,
  loadGameFailure,
  setConfigGame,
  setRoomCode,
  createRoom,
  changeView,
  connectToTheGame,
  changeStatus,
  connectToQuestions,
  sendResponse,
  saveTimeResponse,
  nextQuestion,
  saveResults,
  restartGamesValues
};
