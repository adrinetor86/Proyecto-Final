import { Injectable } from '@angular/core';
import {Juego} from "../interfaces/juego";

@Injectable({
  providedIn: 'root'
})
export class JuegosService {
  // indico que es un objeto de tipo Juego
  games:Juego[] = [
    { title: 'Zelda Breath of the Wild', url: '../assets/zelda.jpg', id: 1 },
    { title: 'Mario Oddysey', url: '../assets/mario2.jpg', id: 2 },
    { title: 'Celeste', url: '../assets/celeste.png', id: 3 },
    { title: 'Fifa 14', url: 'https://assets.goal.com/images/v3/blt18bba0fea65122a0/11eeb00d346319d61c7df0d494e253c40418d195.jpg?format=pjpg&auto=webp&width=3840&quality=60', id: 4 },
    { title: 'Animal Crossing', url: '../assets/animal.jpg', id: 5 },
    { title: 'Watch Dogs', url: 'https://media.vandalimg.com/m/16163/watch-dogs3-201322215311_1.jpg', id: 6 },
    { title: 'Valorant', url: '../assets/valorant.jpg',id: 7 },
    { title: 'ARK', url: 'https://i.pinimg.com/564x/be/41/cc/be41cc45ab96640f836f589cb641f564.jpg', id: 8 },
    { title: 'GTA 5', url: 'https://i.pinimg.com/564x/46/f3/fd/46f3fdb5f464dd8f1ac72f908f764ded.jpg',id: 9 },

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
