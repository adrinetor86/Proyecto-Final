import {Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {ValidService} from "../servicios/validate.service";
import {Observable, Subscription} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import { environment } from '../enviroments/enviroments';

import { debounceTime } from 'rxjs/operators';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent implements OnInit,OnDestroy {


  constructor(private router:Router,private validateService:ValidService,private http: HttpClient) {}

  suscripcion: Subscription;
  menuOpen = false;
  loginOpen = false;
  usuarioLogado = false;
  usuarioSub :Subscription;
  datosUsuario: any;
  rolUsuario: any;
  fotoUsuario: any;
  nombreUsuario: any;
  userRoleSubscription: Subscription;
  isAdmin = false;
  //Descomentar si se quiere ver el tamaño de la ventana
  // windowWidth: number = window.innerWidth;
  // windowHeight: number = window.innerHeight;

  ngOnInit(): void {
  //   se suscribe al observable isLogged para saber si el usuario esta logeado o no
  //   console.log("comprobando si esta logeado");
  //   console.log(this.validateService.isLogged);

    this.usuarioSub = this.validateService.isLogged.subscribe({
    next: (value) => {
      this.usuarioLogado = value;


      this.suscripcion= this.obtenerDatosUsuario(this.validateService.getUserName())
        .pipe(debounceTime(2000))
        .subscribe({
        next: (value) => {
          this.datosUsuario = value['profile'];
          // console.log("LOS DATOS DEL USUARIO");
          // console.log(this.datosUsuario);
          this.rolUsuario = this.datosUsuario['rol'];
          // console.log("EL ROLE");
          // console.log(this.rolUsuario);
          this.fotoUsuario=this.datosUsuario['profile_picture'];
          this.nombreUsuario=this.datosUsuario['username'];
        }

      });
    }

  })
    this.userRoleSubscription = this.validateService.userRole.subscribe((role: number) => {

      // console.log(role);
      this.isAdmin = role === 1;
    });

    // console.log(this.usuarioSub)
    // console.log("se ha suscrito");
  }





  obtenerDatosUsuario(username: string): Observable<Object> {
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    const body = new HttpParams()
      .set('username',username)

    // return this.http.post("http://127.0.0.1:8000/your_profile/"+username+"/", body.toString(),{ headers });
    return this.http.post(environment.apiUrl+"your_profile/"+username+"/", body.toString(),{ headers });
  }

  @ViewChild('loginContainer') loginContainer: ElementRef;
  ngOnDestroy(): void {

    this.usuarioSub.unsubscribe();
    this.suscripcion.unsubscribe();
    // this.suscripcion.unsubscribe();
    this.userRoleSubscription.unsubscribe();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const clickedInside = this.loginContainer.nativeElement.contains(event.target);
    if (!clickedInside && this.loginOpen) {
      this.loginOpen = false;
    }
  }
  desconectar(){
    this.validateService.deleteUserRole();
    this.validateService.logeado.next(false);
    this.validateService.borrarToken();
    this.validateService.borrarUsername();
    this.router.navigate(['/']);
  }

  //Metodo para activar o desactivar el menu
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  toggleLogin(){
    this.loginOpen = !this.loginOpen;
  }


  //Es un servicio que que en funcion del tamaño de la ventana setea el menu a false o a true
  @HostListener('window:resize', ['$event'])
  onResize(event) {

    //Sirve para ver el tamaño de la ventana
    // this.windowWidth = event.target.innerWidth;
    // this.windowHeight = event.target.innerHeight;

    if (event.target.innerWidth <= 710) {
      this.menuOpen = false;
    }
    else {
      this.menuOpen = false; // Cierra el menú cuando la ventana se maximiza
    }
  }



}
