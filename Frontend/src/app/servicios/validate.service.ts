import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ValidService {

  logeado:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.usuarioLogeado());
  constructor(private httpClient: HttpClient) {}

  registerNewUser(email: string, username: string, password: string): Observable<Object> {
    //para tener los datos "planos" (clave-valor) se necesita este formato
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    const body = new HttpParams()
      .set('email', email)
      .set('username', username)
      .set('password', password);

    return this.httpClient.post("http://127.0.0.1:8000/register/", body.toString(), { headers });
  }
  testDataLogin(email: string, password: string): Observable<Object> {
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    const body = new HttpParams()
    .set('email', email)
    .set('password', password);

    return this.httpClient.post("http://127.0.0.1:8000/login/", body.toString(), { headers });
  }

  get isLogged(): Observable<boolean> {
    return this.logeado.asObservable();
  }

  usuarioLogeado(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  borrarToken(): void {
    localStorage.removeItem('accessToken');
  }
  almacenarToken(accessToken: string): void {
  localStorage.setItem('accessToken', accessToken);
  }

  getAccessToken(): string {
    return localStorage.getItem('accessToken');
  }



}
