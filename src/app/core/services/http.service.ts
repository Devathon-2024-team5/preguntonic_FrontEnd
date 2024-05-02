import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { RoomPlayer } from '../../pages/room-configuration/room-configuration.component';
import { Observable } from 'rxjs';
import { IPlayer } from '../../store/models/IPlayers.state';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private _http = inject(HttpClient)
  private url: string = "http://localhost:8080/v1/rooms"
  constructor() { }

  public createRoom (roomPlayer: RoomPlayer): Observable<HttpResponse<any>>{
    return this._http.post(this.url, roomPlayer, {
      observe:"response"
    })
  }

  public createPlayer (roomPlayer: RoomPlayer, roomId : string): Observable<any>{
    return this._http.post(this.url+`/${roomId}/players`, roomPlayer)
  }

  public getRoom (roomId: string): Observable<any> {
    return this._http.get(this.url + "/" + roomId)
  }
  
  public connectRoom (code: string, player: Pick<IPlayer, 'avatar' | 'name' >) {

    return this._http.put(`${this.url}/${code}`, {
      headers: 'aplications json',
      body: {
        player
      }
    })
  }
}


