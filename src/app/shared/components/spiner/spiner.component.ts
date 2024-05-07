import { Component, input } from '@angular/core';

@Component({
  selector: 'app-spiner',
  standalone: true,
  imports: [],
  templateUrl: './spiner.component.html',
  styleUrl: './spiner.component.css'
})
export class SpinerComponent {
  message = input.required<string>()
}
