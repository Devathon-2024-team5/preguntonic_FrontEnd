import { createAction, props } from "@ngrx/store";
import { IPlayer } from "../models/IPlayers.state";

const loadPlayers = createAction("[Players] Load Players");
const loadPlayersFailure = createAction("[Players] Load Players Failure", props<{ error: string }>());
const updatePlayers = createAction("[Players] Update Players", props<{ players: IPlayer[] }>());

export const PlayersActions = {
  loadPlayers,
  updatePlayers,
  loadPlayersFailure
};
