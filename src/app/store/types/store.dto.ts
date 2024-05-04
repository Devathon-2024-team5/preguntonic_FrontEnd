import { IGameState } from "../models/IGame.state"
import { IPlayer } from "../models/IPlayers.state"

export type GameConfigDTO = Pick<IGameState, 'maxPlayers' | 'numOfQuestion'>

export type PlayerDTO = Pick<IPlayer, 'avatar' | 'playerName'>
