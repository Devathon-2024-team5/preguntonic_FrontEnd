import { Component } from '@angular/core';
import { CustomButtonComponent } from "../../../../shared/components/custom-btn/custom-button.component";

@Component({
    selector: 'app-code-container',
    standalone: true,
    templateUrl: './code-container.component.html',
    styleUrl: './code-container.component.css',
    imports: [CustomButtonComponent]
})
export class CodeContainerComponent {
    public coderoom : number = 666676;

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
