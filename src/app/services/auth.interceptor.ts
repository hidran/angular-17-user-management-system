import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authToken = this.authService.getToken();
    let authReq = request;
    if (authToken) {

      authReq = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + authToken)
      });
    }

    // send cloned request with header to the next handler.
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);

        return throwError(() => error.error ?? error.message);
      })
    );
  }
}
