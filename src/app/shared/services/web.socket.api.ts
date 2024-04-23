import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { interval, Observable, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private webSocketEndPoint = 'http://localhost:8080/preguntonic';
  private topic = '/room/';
  private socket$: WebSocketSubject<any> | null = null;
  private destroy$ = new Subject<void>();

  constructor() {}

  connect(roomId: string, playerName: string, avatarId: string): void {
    this.socket$ = webSocket(this.webSocketEndPoint);

    const connectMessage = JSON.stringify({ type: 'join', roomId });

    this.socket$
      .pipe(
        switchMap(() => this.socket$.multiplex(
          () => connectMessage,
          () => JSON.stringify({ type: 'leave', roomId }),
          (message: any) => message.type === 'message' && message.roomId === roomId
        )),
        takeUntil(this.destroy$)
      )
      .subscribe((message: any) => {
        console.log('Message Received from Server:', message);
      });

    // Reconnect every 5 seconds if disconnected
    interval(5000)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        if (!this.socket$ || this.socket$.closed) {
          this.connect(roomId, playerName, avatarId);
        }
      });
  }

  disconnect(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.socket$) {
      this.socket$.complete();
      console.log('Disconnected');
    }
  }
}
