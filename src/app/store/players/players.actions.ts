import { createAction, props } from "@ngrx/store";
import { IPlayer } from "../models/IPlayers.state";

const loadPlayers = createAction("[Players] Load Players");

const savePlayer = createAction('[Home Page] Save info Player', props<{playerName : string, avatar: string}>());

const saveCurrentPlayer = createAction('[Home Page] Save info Player', props<{playerName : string, avatar: string}>());

const loadPlayersFailure = createAction("[Players] Load Players Failure", props<{ error: string }>());

const updatePlayers = createAction("[Players] Update Players", props<{ players: IPlayer[] }>());

const changeReadyStatus = createAction("[Players] Change Ready Status", props<{ playerId: string, isReady: boolean }>());

export const PLAYERS_ACTIONS = {
  loadPlayers,
  updatePlayers,
  loadPlayersFailure,
  changeReadyStatus,
  savePlayer,
  saveCurrentPlayer
};
