import { createReducer, on } from "@ngrx/store";
import { IGameState } from "../models/IGame.state";

export const initialState: IGameState = {
  questions: []
}
