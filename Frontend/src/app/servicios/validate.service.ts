import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import jwt_decode, {jwtDecode} from 'jwt-decode';
import { environment } from '../enviroments/enviroments';
// import { TokenService } from './token.service';
@Injectable({
  providedIn: 'root'
})



export class ValidService {
  // private jwtHelper: JwtHelperService = new JwtHelperService();

  userRoleSubject: BehaviorSubject<number> = new BehaviorSubject<number>(this.getUserRole());
  logeado:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.usuarioLogeado());
  constructor(private httpClient: HttpClient) {}
  decodedToken: any;
  registerNewUser(email: string, username: string, password: string): Observable<Object> {
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    const body = new HttpParams()
      .set('email', email)
      .set('username', username)
      .set('password', password);

    // return this.httpClient.post("http://127.0.0.1:8000/register/", body.toString(), { headers });
    return this.httpClient.post(environment.apiUrl+"/register/", body.toString(), { headers });
  }
  testDataLogin(email: string, password: string): Observable<Object> {
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    const body = new HttpParams()
    .set('email', email)
    .set('password', password);

    // return this.httpClient.post("http://127.0.0.1:8000/login/", body.toString(), { headers });
    return this.httpClient.post(environment.apiUrl+"/login/", body.toString(), { headers });
  }
  sendCodeRecoveryPassword(email: string){
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    const body = new HttpParams()
      .set('email', email)


    // return this.httpClient.post("http://127.0.0.1:8000/confirm_user/", body.toString(), { headers });
    return this.httpClient.post(environment.apiUrl+"/confirm_user/", body.toString(), { headers });
  }
  verifyCodeValidation(email:string, code: number){
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    const body = new HttpParams()
      .set('email', email)
      .set('code', code)

    return this.httpClient.post(environment.apiUrl+"/confirm_code/", body.toString(), { headers });
  }
  changePasswordAccount(email:string, new_password:string){
    const token = localStorage.getItem("token")

    const headers = { 'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': token };
    const body = new HttpParams()
      .set('email', email)
      .set('new_password', new_password)
    console.log("entra")
    console.log(body.toString())
    // return this.httpClient.post("http://127.0.0.1:8000/change_password/", body.toString(), { headers });
    return this.httpClient.post(environment.apiUrl+"/change_password/", body.toString(), { headers });
  }
  get isLogged(): Observable<boolean> {
    return this.logeado.asObservable();
  }

  usuarioLogeado(): boolean {
    return !!localStorage.getItem('accessToken');

  }

  setRole(accessToken: string): void {
    const decodedToken = this.decodeToken(accessToken);
    this.userRoleSubject.next(decodedToken ? decodedToken.rol : 0);
  }

  borrarToken(): void {
    localStorage.removeItem('accessToken');
  }
  almacenarToken(accessToken: string): void {
  localStorage.setItem('accessToken', accessToken);

  }

  almacenarTokenUser(username: string): void {
    localStorage.setItem('username', username);
  }

  getAccessToken(): string {
    return localStorage.getItem('accessToken');
  }

  getUserToken(): string {
    return localStorage.getItem('username');
  }

  borrarUsername(): void {
    localStorage.removeItem('username');
  }

  decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      console.error("Error decoding token", Error);
      return null;
    }
  }

  getUserName(): string {
    const accessToken: string = this.getAccessToken();
    if (!accessToken) {
      return '';
    }
    const decodedToken = this.decodeToken(accessToken);
    return decodedToken ? decodedToken.username : '';
  }

  get userRole(): Observable<number> {
    return this.userRoleSubject.asObservable();
  }

  getUserRole(): number {
    const accessToken: string = this.getAccessToken();
    if (!accessToken) {
      return 0;
    }

    const decodedToken = this.decodeToken(accessToken);
    console.log("EL DECODED");
    console.log(decodedToken);
    return decodedToken ? decodedToken.rol : 0;

  }

  deleteUserRole(): void {
    this.userRoleSubject.next(0);
  }

}
