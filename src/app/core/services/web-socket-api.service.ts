import { Injectable } from '@angular/core';
import { Frame, IMessage, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root',
})
export class WebSocketApiService {
  webSocketEndPoint: string = 'http://localhost:8080/preguntonic';
  topic: string = '/room/';
  stompClient: any;
  roomId: string = '';
  player_name: string = '';
  avatar_id: string = '';

  _connect(roomId: string, player_name: string, avatar_id: string) {
    console.log('connect');
    this.roomId = roomId;
    console.log('Initialize WebSocket Connection');
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
            console.log(wsResponse.body);
            console.log(JSON.parse(wsResponse.body));
          }
        );
        //_this.stompClient.reconnect_delay = 2000;
        const response = _this.stompClient.send(
          `/app/rooms/${roomId}/lobby/join`,
          {},
          JSON.stringify({ player_name: player_name, avatar_id: avatar_id })
        );
        console.log('response stomp send: ', response);
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
    setTimeout(() => {
      this._connect(this.roomId, this.player_name, this.avatar_id);
    }, 5000);
  };

  onMessageReceived(message: any) {
    console.log('Message Recieved from Server :: ' + message);
  }
}
