import { Component } from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrl: './view-profile.component.css'
})
export class ViewProfileComponent {

  nameUser = localStorage.getItem("perfilUsuarioExterno");
  datosUsuario;
  suscripcion:Subscription;
  constructor(private http:HttpClient) {
  }
  ngOnInit(): void {
    console.log("OHHH DIOS MIOS")
    console.log(this.nameUser);
    this.suscripcion= this.obtenerDatosUsuario(this.nameUser).subscribe({
      next: (value) => {
        console.log(value);
        this.datosUsuario = value['profile'];
        console.log(this.datosUsuario);

      }
    });
  }
  obtenerDatosUsuario(username: string): Observable<Object> {
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    const body = new HttpParams()
      .set('username',username)

    return this.http.post("http://127.0.0.1:8000/your_profile/"+username+"/", body.toString(),{ headers });
  }
}
