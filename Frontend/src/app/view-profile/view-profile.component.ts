import { Component } from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import { environment } from '../enviroments/enviroments';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrl: './view-profile.component.css'
})
export class ViewProfileComponent {

  nameUser: string;
  datosUsuario;
  suscripcion:Subscription;
  constructor(private http:HttpClient,private location:Location, private router:Router) {
  }

  subirScroll(){
    scrollTo(0,0);
  }
  ngOnInit(): void {
    this.subirScroll();
    this.nameUser = this.extractNameFromURL();
    // console.log(this.nameUser);
    this.suscripcion= this.obtenerDatosUsuario(this.nameUser).subscribe({
      next: (value) => {
        // console.log(value);
        this.datosUsuario = value['profile'];
        // console.log("los datos")
        // console.log(this.datosUsuario);

      }
    });
  }
  onBack() {
    this.router.navigate(['/'])
  }
  extractNameFromURL(): string {
    const url = this.router.url;
    const segments = url.split('/');
    const index = segments.indexOf('view_profile');
    if (index !== -1) {
      return segments[index + 1];
    }
    return '';
  }
  obtenerDatosUsuario(username: string): Observable<Object> {
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    const body = new HttpParams()
      .set('username',username)

    // return this.http.post("http://127.0.0.1:8000/view_profile/"+username+"/", body.toString(),{ headers });
    return this.http.post(environment.apiUrl+"view_profile/"+username+"/", body.toString(),{ headers });
  }
}


