import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { EMPTY, catchError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core';
import { HttpStatusHandlerService } from '../services/http-status-handler.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastrService);
  const statusHandlerService = inject(HttpStatusHandlerService);

  return next(req).pipe(
    catchError(e => {
      if (!(e instanceof HttpErrorResponse)) return EMPTY;
      console.log(e);

      const errorMessage = statusHandlerService.getStatusCodeMessage(e.status);
      toastService.error(
        `An unexpected error occurred: ${errorMessage}`,
        'Error'
      );

      return EMPTY;
    })
  );
};
