import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,HttpResponse} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ValidService} from "../servicios/validate.service";


@Injectable()
export class LoginInterceptor implements HttpInterceptor {

  constructor(private validateService: ValidService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("entrando en el interceptor")
    return next.handle(req)
      .pipe(
        tap(event => {
          console.log("entrando en el tap")
          if (event instanceof HttpResponse && req.url.endsWith('/login/')) {
            console.log("entrando en el if")
           const accessToken = event.body.token;
            // console.log(event.body)
            this.validateService.almacenarToken(accessToken);
            this.validateService.logeado.next(true);
          }
          console.log("entrando en el else")
          console.log(req.url)
        }),
        catchError((error) => {
          console.log("entrando en el catch")
          return throwError(() => error);
        })
      );
  }
}

export class loginInterceptor {
}
