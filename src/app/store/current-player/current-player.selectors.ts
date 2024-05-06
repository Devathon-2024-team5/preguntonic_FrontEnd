import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { ICurrentPlayerState } from "../models/ICurrentPlayer.state";

const selectCurrentPlayerSelector = (state: AppState) => state.currentPlayerState;

const selectCurrentPlayer = createSelector(
    selectCurrentPlayerSelector,
    (state: ICurrentPlayerState) => state
);

export const CURRENT_PLAYER_SELECTS = {
    selectCurrentPlayer
}
