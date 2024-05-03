import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IPlayer } from '../../store/models/IPlayers.state';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { IGameState } from '../../store/models/IGame.state';

type gameConfig = Pick<IGameState, 'maxPlayers' | 'numOfQuestion'>
type playerConfig = Pick<IPlayer, 'avatar' | 'playerName'>

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private _http = inject(HttpClient)
  private url: string = "http://localhost:8080/v1/rooms"
  constructor() { }

  public createRoom (room: gameConfig): Observable<HttpResponse<any>>{
    return this._http.post(this.url, room, {
      observe:"response"
    })
  }

  public createPlayer (roomPlayer: playerConfig, roomId : string): Observable<HttpResponse<any>>{
    return this._http.post(this.url+`/${roomId}/players`, roomPlayer, {
      observe:"response"
    })
  }

  public getRoom (roomId: string): Observable<any> {
    return this._http.get(this.url + "/" + roomId)
  }
  
  public connectRoom (code: string, player: Pick<IPlayer, 'avatar' | 'playerName' >) {
    return this._http.post(`${this.url}/${code}`, {
      headers: 'aplications json',
      body: {
        player
      }
    })
  }
}


