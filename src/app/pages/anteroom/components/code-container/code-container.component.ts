import { Component, OnInit, inject } from '@angular/core';
import { CustomButtonComponent } from "../../../../components/custom-btn/custom-button.component";
import { ActivatedRoute } from '@angular/router';


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
        this.route.paramMap.subscribe(p => {
            const id = p.get('roomCode')
            console.log(id);
            if (!id) return;
            this.coderoom = id
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
