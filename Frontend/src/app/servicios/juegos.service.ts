import { Injectable } from '@angular/core';
import {Juego} from "../interfaces/juego";

@Injectable({
  providedIn: 'root'
})
export class JuegosService {
  // indico que es un objeto de tipo Juego
  games:Juego[] = [
    { title: 'Zelda Breath of the Wild', url: 'https://assets.nintendo.com/image/upload/ar_16:9,b_auto:border,c_lpad/b_white/f_auto/q_auto/dpr_1.5/ncom/software/switch/70010000000025/7137262b5a64d921e193653f8aa0b722925abc5680380ca0e18a5cfd91697f58', id: 1 },
    { title: 'Mario Oddysey', url: 'https://assets.nintendo.com/image/upload/f_auto/q_auto/dpr_1.5/ncom/software/switch/70010000001130/c42553b4fd0312c31e70ec7468c6c9bccd739f340152925b9600631f2d29f8b5', id: 2 },
    { title: 'Celeste', url: 'https://img-eshop.cdn.nintendo.net/i/691ba3e0801180a9864cc8a7694b6f98097f9d9799bc7e3dc6db92f086759252.jpg', id: 3 },
    { title: 'Fifa 23', url: 'https://gaming-cdn.com/images/products/10545/orig/fifa-23-pc-juego-ea-app-cover.jpg?v=1703155498', id: 4 },
    { title: 'Animal Crossing', url: 'https://assets.nintendo.com/image/upload/f_auto/q_auto/dpr_1.5/ncom/software/switch/70010000027619/9989957eae3a6b545194c42fec2071675c34aadacd65e6b33fdfe7b3b6a86c3a', id: 5 },
    { title: 'Watch Dogs', url: 'https://gaming-cdn.com/images/products/254/orig/watch-dogs-pc-game-ubisoft-connect-europe-cover.jpg?v=1701182642', id: 6 },
    { title: 'Valorant', url: 'https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2021/06/03/16227169457277.jpg',id: 7 },
    { title: 'ARK', url: 'https://cloudfront-us-east-1.images.arcpublishing.com/copesa/LGKRJHVJTJGLHF4HJPR7K576WM.jpg', id: 8 },
    { title: 'GTA 5', url: 'https://www.allkeyshop.com/blog/wp-content/uploads/GTA-5-Game-Pass.webp',id: 9 },


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
