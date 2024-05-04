import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { GameConfigDTO, PlayerDTO } from '../../store/types/store.dto';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private _http = inject(HttpClient)
  private url: string = "http://localhost:8080/v1/rooms"
  constructor() { }

  public createRoom (room: GameConfigDTO): Observable<HttpResponse<any>>{
    return this._http.post(this.url, room, {
      observe:"response"
    })
  }

  public createPlayer (roomPlayer: PlayerDTO, roomId : string): Observable<HttpResponse<any>>{
    return this._http.post(this.url+`/${roomId}/players`, roomPlayer, {
      observe:"response"
    })
  }

  public getRoom (roomId: string): Observable<any> {
    return this._http.get(this.url + "/" + roomId)
  }

  public connectRoom (code: string, player: PlayerDTO) {
    return this._http.post(`${this.url}/${code}`, {
      headers: 'aplications json',
      body: {
        player
      }
    })
  }


}


