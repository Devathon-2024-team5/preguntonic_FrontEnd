import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AvatarService } from '../../services/avatar.service';
import { backgroundValues, frameValues, shadowValues } from '../../../core/models/avatarWithFrameComponent.types';
import { CommonModule } from '@angular/common';

const defaultAvatarUrl = 'assets/images/unknown.webp';

@Component({
  selector: 'app-avatar-with-frame',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar-with-frame.component.html',
  styleUrl: './avatar-with-frame.component.css'
})
export class AvatarWithFrameComponent implements OnChanges, OnInit {
  @Input() avatarId: number = 10;
  // Properties of styles component
  @Input() shadow: shadowValues = "";
  @Input() frameMesuare:frameValues = "";
  @Input() background: backgroundValues = "";

  avatarUrl = defaultAvatarUrl; // Url by defect

  constructor(private avatarService:AvatarService) {}

  updateAvatarUrl() {
    if(this.avatarId !== undefined && this.avatarId >= 0){
      this.avatarUrl = this.avatarService.getAvatarUrlById(this.avatarId);
    } else {
      this.avatarUrl = defaultAvatarUrl;
    }
  }

  ngOnInit(): void {
    this.updateAvatarUrl();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['avatarId'] && !changes['avatarId'].firstChange) {
      this.updateAvatarUrl();
    }
  }
}
