import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type ButtonVariant = "" | "secondary" | "red";

@Component({
  selector: 'app-custom-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-button.component.html',
  styleUrl: './custom-button.component.css'
})
export class CustomButtonComponent {
  @Input() variant:ButtonVariant = "";
}
