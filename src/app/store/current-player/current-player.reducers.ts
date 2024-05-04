import { createReducer, on } from "@ngrx/store";
import { CURRENT_PLAYER_ACTIONS } from "./current-player.action";
import { ICurrentPlayerState } from "../models/ICurrentPlayer.state";


const initialState: ICurrentPlayerState = {
  avatar: '',
  playerName: ''
}

export const currentPlayerReducer = createReducer(
  initialState,
  on(
    CURRENT_PLAYER_ACTIONS.saveCurrentPlayer,
    (state, { avatar, playerName }): ICurrentPlayerState => ({...state, avatar, playerName})
  )
)
