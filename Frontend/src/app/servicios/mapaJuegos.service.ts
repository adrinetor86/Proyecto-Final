import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {juegoMain} from "../interfaces/juego";

@Injectable({
  providedIn: 'root'
})
export class MapasService {


  getMapasData(mapas) {

    // console.log("MAPÀS")
    // console.log(mapas)

    return mapas.maps.map(mapa => ({image: mapa}));

  }

  getMapassSmall(mapas) {
    return Promise.resolve(this.getMapasData(mapas).slice(0, 10));
  }

}
