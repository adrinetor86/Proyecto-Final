import { Injectable } from '@angular/core';
import {Juego} from "../interfaces/juego";

@Injectable({
  providedIn: 'root'
})
export class JuegosService {
  // indico que es un objeto de tipo Juego
  games:Juego[] = [
    { title: 'Zelda Breath of the Wild', url: '../assets/zelda.jpg', id: 1 },
    { title: 'Mario Oddysey', url: '../assets/mario_buena_.jpg', id: 2 },
    { title: 'Celeste', url: '../assets/celeste.png', id: 3 },
    { title: 'Hollow Knight', url: '../assets/hollow.jpg', id: 4 },
    { title: 'Animal Crossing', url: '../assets/animal.jpg', id: 5 },
    { title: 'Gris', url: '../assets/gris.jpg', id: 6 },
    { title: 'Valorant', url: '../assets/valorant.jpg',id: 7 },
    { title: 'Minecraft', url: '../assets/minecraft.png', id: 8 },
    { title: 'Fornite', url: '../assets/fornite.jpeg',id: 9 },

  ];


  constructor() { }

  getJuegobyId(id: number):Juego {
    console.log('Entra')
    for (let juego of this.games) {
      if (juego.id === id) {
        return {...juego};
      }
    }
  }
  getJuegos():Juego[] {
    return [...this.games];
  }
}
