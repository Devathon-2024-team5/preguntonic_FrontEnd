import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { RoomPlayer } from '../../pages/home/home.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpRoomService {
  private _http = inject(HttpClient)
  private url: string = "http://localhost:8080/v1/rooms"
  constructor() { }

  public createRoom (roomPlayer: RoomPlayer): Observable<any> {
    return this._http.post(this.url, roomPlayer)
  }

  public getRoom (roomId: string): Observable<any> {
    return this._http.get(this.url + "/" + roomId)
  }

}
