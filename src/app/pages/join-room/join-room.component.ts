import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LogoTitleComponent } from '../../shared/components/logo-title/logo-title.component';

@Component({
  selector: 'app-join-room',
  standalone: true,
  imports: [FormsModule,LogoTitleComponent],
  templateUrl: './join-room.component.html',
  styleUrl: './join-room.component.css'
})
export class JoinRoomComponent {
  code = '';
}
