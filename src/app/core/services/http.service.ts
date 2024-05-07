import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { GameConfigDTO, PlayerDTO } from '../../store/types/store.dto';
import { ICurrentPlayerState } from '../../store/models/ICurrentPlayer.state';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private _http = inject(HttpClient);
  private url: string = 'https://preguntonic-backend.onrender.com/v1/rooms';

  public createRoom(room: GameConfigDTO): Observable<HttpResponse<any>> {
    return this._http.post(this.url, room, { observe: 'response' });
  }

  public createPlayer( player: PlayerDTO, roomId: string): Observable<HttpResponse<ICurrentPlayerState>> {
    return this._http.post<ICurrentPlayerState>(this.url + `/${roomId}/players`, player, {
      observe: 'response',
    });
  }

  public getRoom(roomId: string): Observable<any> {
    return this._http.get(this.url + '/' + roomId);
  }

  public connectRoom(code: string, player: PlayerDTO) {
    return this._http.post(`${this.url}/${code}`, {
      headers: 'aplications json',
      body: { player },
    });
  }
}
