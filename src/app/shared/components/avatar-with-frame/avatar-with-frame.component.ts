import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AvatarService } from '../../services/avatar.service';
import { backgroundValues, frameValues, shadowValues } from '../../../core/models/avatarWithFrameComponent.types';
import { NgClass } from '@angular/common';
import { IAvatar } from '../../../core/models/IAvatar.interface';

@Component({
  selector: 'app-avatar-with-frame',
  standalone: true,
  imports: [NgClass],
  templateUrl: './avatar-with-frame.component.html',
  styleUrl: './avatar-with-frame.component.css'
})
export class AvatarWithFrameComponent implements OnChanges, OnInit {
  @Input() avatarId: string = "";
  // Properties of styles component
  @Input() shadow: shadowValues = "";
  @Input() frameMesuare:frameValues = "";
  @Input() background: backgroundValues = "";

  currentAvatar: IAvatar = {} as IAvatar;

  constructor(private avatarService:AvatarService) {}

  updateAvatarUrl() {
    if(this.avatarId !== undefined && typeof(this.avatarId) === 'string' ){
      this.currentAvatar = this.avatarService.getAvatarUrlById(this.avatarId);
    } else {
      this.currentAvatar = this.avatarService.getAvatarDefault();
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
