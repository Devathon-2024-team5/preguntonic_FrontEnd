import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core';

export const errorInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastrService);
  console.log(req);

  return next(req).pipe(
    catchError((e: HttpErrorResponse) =>
      throwError(() =>
        toastService.error(
          `An unexpected error occurred: ${e.message}`,
          'Error'
        )
      )
    )
  );
};
