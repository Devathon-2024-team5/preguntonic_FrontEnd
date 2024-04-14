import { Component } from '@angular/core';
import { CustomButtonComponent } from '../../components/custom-button/custom-button.component';
import { LogoTitleComponent } from "../../shared/UI/logoTitle/logoTitle.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [CustomButtonComponent, LogoTitleComponent]
})
export class HomeComponent {

}
