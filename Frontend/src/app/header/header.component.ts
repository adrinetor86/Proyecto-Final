import {Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {ValidService} from "../servicios/validate.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent implements OnInit,OnDestroy {


  constructor(private router:Router,private validateService:ValidService) {}

  menuOpen = false;
  loginOpen = false;
  usuarioLogado = false;
  usuarioSub :Subscription;
  //Descomentar si se quiere ver el tamaño de la ventana
  // windowWidth: number = window.innerWidth;
  // windowHeight: number = window.innerHeight;

  ngOnInit(): void {
  //   se suscribe al observable isLogged para saber si el usuario esta logeado o no
    console.log("comprobando si esta logeado");
    console.log(this.validateService.isLogged);
  this.usuarioSub = this.validateService.isLogged.subscribe({

    next: (value) => {
      this.usuarioLogado = value;
    }

  })
    console.log(this.usuarioSub)
    console.log("se ha suscrito");
  }
  @ViewChild('loginContainer') loginContainer: ElementRef;
  ngOnDestroy(): void {
    console.log("se ha fue")
    this.usuarioSub.unsubscribe();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const clickedInside = this.loginContainer.nativeElement.contains(event.target);
    if (!clickedInside && this.loginOpen) {
      this.loginOpen = false;
    }
  }
  desconectar(){
    this.validateService.logeado.next(false);
    this.validateService.borrarToken();
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

    if (event.target.innerWidth >= 710) {
      this.menuOpen = false;
    }
  }



}
