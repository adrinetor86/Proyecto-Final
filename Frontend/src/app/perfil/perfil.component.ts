import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {



  constructor(private http: HttpClient) { }

  obtenerDatosUsuario(username: string): Observable<Object> {
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    const body = new HttpParams()
      .set('username', username)

    return this.http.post("http://127.0.0.1:8000/your_profile/"+username, { headers });
  }
}




