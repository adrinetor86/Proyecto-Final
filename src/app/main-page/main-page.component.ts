import { Component } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {
  games = [
    { title: 'Zelda Breath of the Wild', url: '../assets/zelda.jpg' },
    { title: 'Mario Oddysey', url: '../assets/mario2.jpg' },
    { title: 'Celeste', url: '../assets/celeste.png' },
    { title: 'Hollow Knight', url: '../assets/hollow.jpg' },
    { title: 'Animal Crossing', url: '../assets/animal.jpg' },
    { title: 'Gris', url: '../assets/gris.jpg' },
    { title: 'Valorant', url: '../assets/valorant.jpg' },
    { title: 'Minecraft', url: '../assets/minecraft.png' },
    { title: 'Fornite', url: '../assets/fornite.jpeg' },
  ];
}

