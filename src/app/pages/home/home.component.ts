import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LogoTitleComponent } from "../../shared/components/logo-title/logo-title.component";
import { AvatarImageComponent } from '../../components/avatar-img/avatar-image.component';
import { CustomButtonComponent } from '../../components/custom-btn/custom-button.component';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    changeDetection:ChangeDetectionStrategy.OnPush,
    styleUrl: './home.component.css',
    imports: [CustomButtonComponent, LogoTitleComponent, AvatarImageComponent]
})
export class HomeComponent {
    avatarImages: string[] = [
        '../../../assets/avatar-1.webp',
        '../../../assets/avatar-2.webp',
        '../../../assets/avatar-3.webp',
        '../../../assets/avatar-4.webp'
      ];
      selectedAvatar: string = '';
      playerName: string = '';
    
      selectAvatar(avatar: string) {
        this.selectedAvatar = avatar;
      }
    
      onNameInputChange(event: Event) {
        // Utiliza la interfaz HTMLInputElement para asegurar que event.target es un input element
        const inputElement = event.target as HTMLInputElement;
        this.playerName = inputElement.value;
      }
      iniciarPartida() {
        // Verificar si se ha ingresado un nombre
        if (this.playerName.trim() !== '') {
          // Crear el objeto JSON con la información capturada
          const playerData = {
            avatar: this.selectedAvatar,
            playerName: this.playerName
          };
      
          // Imprimir el objeto JSON en consola
          console.log(playerData);
        } else {
          // Mostrar una alerta si no se ha ingresado un nombre
          alert("Por favor, ingresa un nombre.");
        }
      }
      
      
}
