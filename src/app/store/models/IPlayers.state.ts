import { PlayerDTO } from "../types/store.dto";

export interface IPlayer {
    playerId: string;
    playerName: string;
    avatar: string;
    score: number;
    isReady: boolean;
  }


  export interface IPlayersState {
    players: IPlayer[];
    currentPlayer: PlayerDTO;
    isLoading: boolean;
    error: string | null;
 }
