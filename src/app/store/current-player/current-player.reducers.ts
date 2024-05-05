import { createReducer, on } from "@ngrx/store";
import { CURRENT_PLAYER_ACTIONS } from "./current-player.action";
import { ICurrentPlayerState } from "../models/ICurrentPlayer.state";


const initialState: ICurrentPlayerState = {
  avatar: '',
  playerName: '',
  playerId: ''
}

export const currentPlayerReducer = createReducer(
  initialState,
  on(
    CURRENT_PLAYER_ACTIONS.saveCurrentPlayer,
    (state, { avatar, playerName, playerId }): ICurrentPlayerState => (
      console.log('grabando el ID:',playerId),
      {...state, avatar, playerName, playerId: playerId ?? 'nada'}
    )
  )
)
