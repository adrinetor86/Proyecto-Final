import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})

export class MainPageComponent {
  games = [
    { title: 'Zelda Breath of the Wild', url: '../assets/zelda.jpg', id: 1 },
    { title: 'Mario Oddysey', url: '../assets/mario2.jpg', id: 2 },
    { title: 'Celeste', url: '../assets/celeste.png', id: 3 },
    { title: 'Hollow Knight', url: '../assets/hollow.jpg', id: 4 },
    { title: 'Animal Crossing', url: '../assets/animal.jpg', id: 5 },
    { title: 'Gris', url: '../assets/gris.jpg', id: 6 },
    { title: 'Valorant', url: '../assets/valorant.jpg',id: 7 },
    { title: 'Minecraft', url: '../assets/minecraft.png', id: 8 },
    { title: 'Fornite', url: '../assets/fornite.jpeg',id: 9 },
  ];
  constructor(private router:Router) { }
  goToLogin(){
    this.router.navigate(['/login']);
  }
}

