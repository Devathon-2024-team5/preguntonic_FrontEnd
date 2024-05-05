import { StatusGame } from "../types/store.dto"

export interface IPlayer {
    admin : boolean
    avatar : string
    ipAddress : string
    playerId :  string
    playerName :  string
    readyForNextQuestion : boolean
    responded : boolean
    responseId :  string
    responseTime :  number
    score : number
    status : StatusGame
  }

  export interface IPlayersState {
    players: IPlayer[];
    isLoading: boolean;
    error: string | null;
 }


