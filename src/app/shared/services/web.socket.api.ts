import { Injectable } from '@angular/core';
import {Stomp} from '@stomp/stompjs';
import SockJS from 'sockjs-client';

@Injectable({
    providedIn: 'root'
  })
export class WebSocketAPI {
    webSocketEndPoint: string = 'http://localhost:8080/preguntonic';
    topic: string = "/room/";
    stompClient: any;
    roomId: string = '';
    player_name: string = '';
    avatar_id: string = '';
    
    constructor(){ }
    _connect(roomId: string, player_name: string, avatar_id: string) {
        this.roomId = roomId;
        console.log("Initialize WebSocket Connection");
        let ws = new SockJS(this.webSocketEndPoint);
        this.stompClient = Stomp.over(ws);
        const _this = this;
        _this.stompClient.connect({}, function (frame: any) {
            _this.stompClient.subscribe(_this.topic + roomId, function (wsResponse: any) {
                _this.onMessageReceived(wsResponse);
            });
            //_this.stompClient.reconnect_delay = 2000;
            let response = _this.stompClient.send(`/app/rooms.join/${roomId}`, {}, JSON.stringify({'player_name': player_name, 'avatar_id': avatar_id}));
            console.log("response stomp send: ", response);
        }, this.errorCallBack);
        // if (this.stompClient.status === 'CONNECTED') {
        //     let response = this.stompClient.send(`/app/rooms.join/${roomId}`, {}, JSON.stringify({'player_name': player_name, 'avatar_id': avatar_id}));
        //     console.log("response stomp send: ", response);
        // }
    };

    _disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
        console.log("Disconnected");
    }

    // on error, schedule a reconnection attempt
    errorCallBack(error: string) {
        console.log("errorCallBack -> " + error)
        setTimeout(() => {
            this._connect(this.roomId, this.player_name, this.avatar_id);
        }, 5000);
    }

	/**
	 * Send message to sever via web socket
	 * @param {*} message 
	 */
    _send(message: any) {
        console.log("calling logout api via web socket");
        this.stompClient.send("/app/hello", {}, JSON.stringify(message));
    }

    onMessageReceived(message: any) {
        console.log("Message Recieved from Server :: " + message);
    }
}