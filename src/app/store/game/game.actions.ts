import { createAction, props } from "@ngrx/store";
import { IQuestion } from "../models/IGame.state";

const loadGame = createAction('[Game Room] Load Game');

const updateQuestion = createAction('[Game Room] Update Question',
  props<{questions: IQuestion[], currentQuestion: number}>()
);

const loadGameFailure = createAction('[Game Room] Load Game Failure',
  props<{ error: string }>()
);

export const GAME_ACTIONS = {
    loadGame,
    updateQuestion,
    loadGameFailure
};
