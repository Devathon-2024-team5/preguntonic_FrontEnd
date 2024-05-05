import { Injectable } from '@angular/core';
import { IAvatar } from '../models/IAvatar.interface';

const avatars:IAvatar[] = [
  {
    id: 'cat1',
    url: 'assets/images/cat.webp',
    title: 'Gato animado color azul, con ojos azules y con expresión amigable'
  },
  {
    id: 'dog1',
    url: 'assets/images/dog.webp',
    title: 'Perro animado de orejas caidas, color cafe, con ojos verdes y expresión amigable'
  },
  {
    id: 'penguin1',
    url: 'assets/images/penguin.webp',
    title: 'Pingüino animado, color blanco y negro, de pico amarillo, con ojos grises y expresión amigable'
  },
  {
    id: 'raccoon1',
    url: 'assets/images/raccoon.webp',
    title: 'Mapache animado, color cafe con color crema, con ojos cafe claro y expresión amigable'
  }
]

const avatarDefault:IAvatar = {
  id: 'unknown',
  url: 'assets/images/unknown.webp',
  title: 'Contorno de animal desconocido color gris oscuro, con un signo de interrogacion blanco en la mitad'
}

@Injectable({
  providedIn: 'root'
})
export class AvatarService {
  private avatars;
  private avatarDefault;
  
  constructor() {
    this.avatars = avatars;
    this.avatarDefault = avatarDefault;
  }

  getAllAvatars():string[] {
    return this.avatars;
  }
  getAvatarUrlById(avatarId:number):string {
    return this.avatars.at(avatarId) ?? "";
  }
}
