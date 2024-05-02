import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AvatarService } from '../../services/avatar.service';

const defaultAvatarUrl = 'assets/images/unknown.webp';

@Component({
  selector: 'app-avatar-with-frame',
  standalone: true,
  imports: [],
  templateUrl: './avatar-with-frame.component.html',
  styleUrl: './avatar-with-frame.component.css'
})
export class AvatarWithFrameComponent implements OnChanges {
  @Input() avatarId: number = 10;

  avatarUrl = defaultAvatarUrl; // Url by defect

  constructor(private avatarService:AvatarService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['avatarId'] && !changes['avatarId'].firstChange) {
      this.updateAvatarUrl();
    }
  }

  updateAvatarUrl() {
    if(this.avatarId !== undefined && this.avatarId >= 0){
      this.avatarUrl = this.avatarService.getAvatarUrlById(this.avatarId);
    } else {
      this.avatarUrl = defaultAvatarUrl;
    }
  }
}
