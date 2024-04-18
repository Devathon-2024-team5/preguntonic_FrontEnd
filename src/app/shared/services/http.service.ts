import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { RoomPlayer } from '../../pages/home/home.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private _http = inject(HttpClient)

  constructor() { }

  public connect (url: string, roomPlayer: RoomPlayer): Observable<any> {
    return this._http.post(url, {
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(roomPlayer)
    })
  }

}
