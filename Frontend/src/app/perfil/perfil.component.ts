import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit, OnDestroy{

  suscripcion: Subscription;


  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.suscripcion= this.obtenerDatosUsuario(" usuario56").subscribe({
      next: (value) => {
        console.log(value);
      }
    });

  }
  obtenerDatosUsuario(username: string): Observable<Object> {
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    const body = new HttpParams()
      .set('username', username)

    return this.http.post("http://127.0.0.1:8000/your_profile/"+username+"/", body.toString(),{ headers });
  }
  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

}




