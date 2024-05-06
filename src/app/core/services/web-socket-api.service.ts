import { Injectable, inject } from '@angular/core';
import { Frame, IMessage, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { IPlayer } from '../../store/models/IPlayers.state';
import { GAME_ACTIONS } from '../../store/game/game.actions';
import { PLAYERS_ACTIONS } from '../../store/players/players.actions';
import { EventGame } from '../../store/types/store.dto';
import { IAnswer } from '../../store/models/IGame.state';

export interface IResWebSocket {
  event: string;
  room: {
    current_players: IPlayer[];
    max_players: number;
    ready_players: number;
    room_code: string;
    room_status: null;
  };
}

interface IPlayerInGame {
  id: string;
  avatar: string;
  is_ready: boolean;
  nickname: string;
  score: number;
}

interface IResWSInGame {
  current_question: {
    id: string;
    answers: IAnswer[];
    ordinal: number;
    question: string;
  };
  num_questions: string;
  status: string;
  players: IPlayerInGame[];
}

@Injectable({
  providedIn: 'root',
})
export class WebSocketApiService {
  private readonly store: Store<AppState> = inject(Store);
  webSocketEndPoint: string = 'http://localhost:8080/preguntonic';
  topic: string = '/room/';
  stompClient: any;
  roomId: string = '';
  player_name: string = '';
  avatar: string = '';
  playerId: string = '';

  _connect(
    roomId: string,
    player_name: string,
    avatar: string,
    playerId: string
  ) {
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
            const data = JSON.parse(wsResponse.body) as IResWebSocket;
            this.executeEvent(data.event, data);
          }
        );

        _this.stompClient.subscribe(
          _this.topic + roomId + '/game',
          (wsResponse: IMessage) => {
            // const data = JSON.parse(wsResponse.body) as IResWSInGame
            const { current_question } = JSON.parse(
              wsResponse.body
            ) as IResWSInGame;

            this.store.dispatch(
              GAME_ACTIONS.updateQuestion({ question: current_question })
            );
          }
        );

        //_this.stompClient.reconnect_delay = 2000;
        _this.stompClient.send(
          `/app/rooms/${roomId}/lobby/join`,
          {},
          JSON.stringify({
            playerName: player_name,
            avatar: avatar,
            playerId: playerId,
          })
        );
      },
      this.errorCallBack
    );
  }

  readyPlayer(roomId: string, player_id: string) {
    console.log(this.stompClient);
    const response = this.stompClient.send(
      `/app/rooms/${roomId}/lobby/players/${player_id}/ready`,
      {}
    );
    console.log('response stomp send: ', response);
  }

  joinPlayerGame(roomId: string, player_id: string) {
    console.log(this.stompClient);
    this.stompClient.send(
      `/app/rooms/${roomId}/game/players/${player_id}/join`,
      {}
    );
  }

  responseQuestion(
    answerId: string,
    questionId: string,
    player_id: string,
    roomId: string,
    timeMs: number
  ) {
    this.stompClient.send(
      `/app/rooms/${roomId}/game/players/${player_id}/response`,
      {},
      JSON.stringify({
        question_id: questionId,
        response_id: answerId,
        milliseconds: timeMs,
      })
    );
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
      this._connect(this.roomId, this.player_name, this.avatar, this.playerId);
    }, 5000);
  };

  onMessageReceived(message: any) {
    console.log('Message Recieved from Server :: ' + message);
  }

  private executeEvent(event: EventGame | string, data: IResWebSocket): void {
    switch (event) {
      case 'JOIN':
        this.store.dispatch(
          PLAYERS_ACTIONS.updatePlayers({ players: data.room.current_players })
        );
        break;
      case 'READY':
        this.store.dispatch(
          PLAYERS_ACTIONS.updatePlayers({ players: data.room.current_players })
        );
        break;
      case 'UNREADY':
        break;
      case 'START_GAME':
        this.store.dispatch(GAME_ACTIONS.changeView({ route: 'game-room' }));
        break;
      default:
        console.log('nothing');
        break;
    }
  }
}
