import { Injectable, inject } from '@angular/core';
import { Frame, IMessage, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { IPlayer } from '../../store/models/IPlayers.state';
import { GAME_ACTIONS } from '../../store/game/game.actions';
import { PLAYERS_ACTIONS } from '../../store/players/players.actions';

interface IRes  {
  event: string;
  room: {
    current_players: IPlayer[];
    max_players:  number;
    ready_players: number;
    room_code: string;
    room_status: null;
  }
}

@Injectable({
  providedIn: 'root',
})
export class WebSocketApiService {
  private readonly store:Store<AppState> = inject(Store)
  webSocketEndPoint: string = 'http://localhost:8080/preguntonic';
  topic: string = '/room/';
  stompClient: any;
  roomId: string = '';
  player_name: string = '';
  avatar_id: string = '';

  _connect(roomId: string, player_name: string, avatar_id: string) {
    this.roomId = roomId;
    const ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this = this;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _this.stompClient.connect(
      {},
      (frame: Frame) => {
        console.log(`Info : ${frame}`);
        console.log(_this.topic + roomId);

        _this.stompClient.subscribe(
          _this.topic + roomId,
          (wsResponse: IMessage) => {
            const data = JSON.parse(wsResponse.body) as IRes

            console.log(data);

            this.store.dispatch(PLAYERS_ACTIONS.updatePlayers({players: data.room.current_players}))


            //  Aquí la lógica a ejecutar
            // this.store.dispatch(GAME_ACTIONS.)

            // console.log(data);

          }
        );
        //_this.stompClient.reconnect_delay = 2000;
        _this.stompClient.send(
          `/app/rooms/${roomId}/lobby/join`,
          {},
          JSON.stringify({ player_name: player_name, avatar_id: avatar_id })
        );
      },
      this.errorCallBack
    );
  }

  readyPlayer(
    roomId: string,
    player_id: number,
    player_name: string,
    avatar_id: string
  ) {
    console.log(this.stompClient);
    const response = this.stompClient.send(
      `/app/rooms/${roomId}/lobby/players/${player_id}/ready`,
      {},
      JSON.stringify({ player_name: player_name, avatar_id: avatar_id })
    );
    console.log('response stomp send: ', response);
  }

  _disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log('Disconnected');
  }

  // on error, schedule a reconnection attempt
  errorCallBack = (error: string) => {
    console.log('errorCallBack -> ' + error);
    console.log('Se corto la conexión');

    setTimeout(() => {
      this._connect(this.roomId, this.player_name, this.avatar_id);
    }, 5000);
  };

  onMessageReceived(message: any) {
    console.log('Message Recieved from Server :: ' + message);
  }

  private eventHandlerT<T>(event: string, data?: T) {
    switch (event) {
      case "JOIN":
        break;

      default:
        break;
    }
  }
}

