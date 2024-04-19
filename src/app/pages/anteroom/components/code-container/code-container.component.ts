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
    ngOnInit(): void {
        console.log(this.route.params);
        this.route.params.subscribe((params) => {
          console.log(params);
          this.coderoom = params['room_code'];
        }
      );

    }
    route: ActivatedRoute = inject(ActivatedRoute);

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
