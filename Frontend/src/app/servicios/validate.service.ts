import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ValidService {

  constructor(private httpClient: HttpClient) { }

  // validateUser(username: string, password: string): boolean {
  //   return this.user.username === username && this.user.password === password;
  // }
  registerNewUser(email: string, username: string, password: string, rol_user: number): Observable<Object> {
    return this.httpClient.post("http://127.0.0.1:8000/register/", {
      email: email,
      username: username,
      password: password,
      rol_user: rol_user
    });
  }

}
