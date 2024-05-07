import { Component } from '@angular/core';
import { LogoTitleComponent } from '../../../../shared/components/logo-title/logo-title.component';
import { ExitIconButtonComponent } from '../../../../shared/components/exit-icon-button/exit-icon-button.component';

@Component({
  selector: 'app-header-anteroom',
  standalone: true,
  imports: [LogoTitleComponent,ExitIconButtonComponent],
  templateUrl: './header-anteroom.component.html',
  styleUrl: './header-anteroom.component.css'
})
export class HeaderAnteroomComponent {

}
