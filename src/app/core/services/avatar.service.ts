import { Injectable } from '@angular/core';
import { IAvatar } from '../models/IAvatar.interface';


const NAME_AVATARS = ['cat','dog','penguin','raccoon'];

@Injectable({
  providedIn: 'root'
})
export class AvatarService {
  private avatars:string[];
  
  constructor() {
    this.avatars = NAME_AVATARS.map((name) => 'assets/images/'+name+'.webp');
  }

  getAllAvatars():string[] {
    return this.avatars;
  }
  getAvatarUrlById(avatarId:number):string {
    return this.avatars.at(avatarId) ?? "";
  }
}
