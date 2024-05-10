import { Injectable, inject } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { HttpService } from '../../core/services/http.service';
import { Store } from '@ngrx/store';

@Injectable()
export class PlayersEffects {
  private readonly _actions$ = inject(Actions);
  private readonly _http = inject(HttpService);
  private readonly store = inject(Store);
}
