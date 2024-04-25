import { Component, HostListener } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {


  constructor(private router:Router) {}

  menuOpen = false;

  //Descomentar si se quiere ver el tamaño de la ventana
  // windowWidth: number = window.innerWidth;
  // windowHeight: number = window.innerHeight;

  //Metodo para activar o desactivar el menu
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
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
