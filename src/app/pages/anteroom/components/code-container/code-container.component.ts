import { Component, OnInit, inject } from '@angular/core';
import { CustomButtonComponent } from "../../../../components/custom-btn/custom-button.component";
import { ActivatedRoute } from '@angular/router';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

@Component({
    selector: 'app-code-container',
    standalone: true,
    templateUrl: './code-container.component.html',
    styleUrl: './code-container.component.css',
    imports: [CustomButtonComponent]
})
export class CodeContainerComponent implements OnInit{
    public coderoom: string = '123456';
    route: ActivatedRoute = inject(ActivatedRoute);
    ngOnInit(): void {
        this.route.queryParamMap.subscribe(params => {
          const code = params.get('room_code')
            if (!code) return;
            this.coderoom = code;
            console.log(this.coderoom);
            this.connect(this.coderoom)
        });
        
    }

    connect(coderoom:string) {
      let socket = new SockJS('http://localhost:8080/preguntonic');
      let stompClient = Stomp.over(socket);
      stompClient.connect({}, function(frame:any) {
        let roomId = coderoom;
        console.log('Connected: ' + frame + " - " + roomId);
        stompClient.subscribe(`/room/${roomId}`, function(messageOutput) {
          console.log(messageOutput)
          // showMessageOutput(JSON.parse(messageOutput.body));
        });
      });
    }

    copyToClipboard() {
        const element = document.getElementById('coderoom'); // Get the element containing the room code
        if (element) {
          const selection = window.getSelection();
          const range = document.createRange();
          range.selectNodeContents(element);
          if (selection) {
            selection.removeAllRanges();
            selection.addRange(range);
            document.execCommand('copy'); // Copy the selected text to the clipboard
            selection.removeAllRanges();
          }
        }
      }
}
