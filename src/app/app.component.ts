import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SeoService } from './core/services/seo.service';
import { IMetadata, IOpenGraph } from './core/models/IMetadata.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private readonly _seoService: SeoService = inject(SeoService);
  private readonly pageDescription =
    'Preguntonic is a game where you and your friends test their knowledge, with varied questions and in real time.';
  private readonly pageTitle = 'Preguntonic';
  private readonly logo =
    'https://www.dropbox.com/scl/fi/tg5fr1r39achzq0rh5i4h/LOGO-PREGUNTONIC-verde.png?rlkey=umnvmgcbkkzbldj56la5rz455&st=5r1ptf82&raw=1';
  private readonly author =
    'Collaborative project comprised of: Nicolas Lanselota, Alejandro, Wanderlee Max Gutierrez Gamboa, Francisco Javier Peña Vela, Cowboy';
  private readonly keywords =
    'Quiz Game, Devathon, Preguntonic, Multiplayer, Programación en español, HTML, CSS, Typescript, Angular, Bootstrap, WebSocket, Java, Spring boot';
  private readonly openGraphConfig: Partial<IOpenGraph> = {
    'og:title': this.pageTitle,
    'og:description': this.pageDescription,
    'og:type': 'website',
    'og:image': this.logo,
    'og:image:alt': `Quiz Game ${this.pageTitle}`,
    'og:site_name': this.pageTitle,
    'og:url': '',
    'twitter:description': this.pageDescription,
    'twitter:title': this.pageTitle,
    'twitter:card': 'summary',
    'twitter:image:src': this.logo,
  };
  private readonly metaTagConfig: IMetadata = {
    description: this.pageDescription,
    author: this.author,
    keywords: this.keywords,
  };

  constructor() {
    this._seoService.applyIndexFollow();
    this._seoService.updateMetaTags({
      metaTags: this.metaTagConfig,
      ogTags: this.openGraphConfig,
    });
  }
}
