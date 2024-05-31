import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ValidService} from "../servicios/validate.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: ValidService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken: string = this.authService.getAccessToken();
    const username: string = this.authService.getUserToken();
    if (authToken) {
      const authReq: HttpRequest<any> = req.clone({
        headers: req.headers.set('Authorization', `${authToken}`)
      });

      return next.handle(authReq);
    }



    return next.handle(req);
  }
}
