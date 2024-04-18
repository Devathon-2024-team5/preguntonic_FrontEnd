import { Component } from '@angular/core';
import { HeaderAnteroomComponent } from './components/header-anteroom/header-anteroom.component';
import { CodeContainerComponent } from "./components/code-container/code-container.component";

@Component({
    selector: 'app-anteroom',
    standalone: true,
    templateUrl: './anteroom.component.html',
    styleUrl: './anteroom.component.css',
    imports: [HeaderAnteroomComponent, CodeContainerComponent]
})
export class AnteroomComponent {

}
