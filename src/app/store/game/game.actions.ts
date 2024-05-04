import { createAction, props } from '@ngrx/store';
import { IQuestion } from '../models/IGame.state';

const loadGame = createAction('[Game Room] Load Game');

const updateQuestion = createAction(
  '[Game Room] Update Question',
  props<{ questions: IQuestion[]; currentQuestion: number }>()
);

const setConfigGame = createAction(
  '[Room Configuration] Set Config Game',
  props<{ numOfQuestion: number; maxPlayers: number }>()
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
  props<{ route: string }>()
);

export const GAME_ACTIONS = {
  loadGame,
  updateQuestion,
  loadGameFailure,
  setConfigGame,
  setRoomCode,
  createRoom,
  changeView,
};
