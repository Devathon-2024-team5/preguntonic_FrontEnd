import { Component } from '@angular/core';
import { LogoTitleComponent } from '../../../../shared/components/logo-title/logo-title.component';
import { CustomButtonComponent } from '../../../../shared/components/custom-btn/custom-button.component';

@Component({
  selector: 'app-header-anteroom',
  standalone: true,
  imports: [LogoTitleComponent, CustomButtonComponent],
  templateUrl: './header-anteroom.component.html',
  styleUrl: './header-anteroom.component.css'
})
export class HeaderAnteroomComponent {

}
