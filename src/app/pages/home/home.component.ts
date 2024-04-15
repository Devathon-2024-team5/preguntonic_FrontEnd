import { Component } from '@angular/core';
import { LogoTitleComponent } from "../../shared/UI/logoTitle/logoTitle.component";
import { AvatarImageComponent } from '../../components/avatar-image/avatar-image.component';
import { CustomButtonComponent } from '../../components/customButton/custom-button.component';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [CustomButtonComponent, LogoTitleComponent, AvatarImageComponent]
})
export class HomeComponent {
    avatarImages: string[] = [
        'https://via.placeholder.com/300',
        'https://via.placeholder.com/300/ff0000',
        'https://via.placeholder.com/300/0000ff'
      ];
}
