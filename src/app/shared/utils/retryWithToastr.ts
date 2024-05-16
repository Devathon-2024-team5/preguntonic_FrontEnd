import { Observable, of } from 'rxjs';
import { catchError, retry } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { GAME_ACTIONS } from '../../store/game/game.actions';

interface IDataToastr {
  toastService: ToastrService;
  title?: string;
  message: string;
}

export function retryWithToast<T>(retryCount: number, toast: IDataToastr) {
  const { toastService, title, message } = toast;
  console.log('service');

  return (source: Observable<T>) =>
    source.pipe(
      retry(retryCount),
      catchError((error: HttpErrorResponse) => {
        toastService.error(`${message} : ${error.message}`, title);
        console.log(error);

        return of(
          GAME_ACTIONS.loadGameFailure({
            error: `${message} : ${error.message}`,
          })
        );
      })
    );
}
