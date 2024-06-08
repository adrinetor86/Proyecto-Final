import { Injectable } from '@angular/core';
import {Juego, juegoMain} from "../interfaces/juego";
import {Observable, Subscription, timeout} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import { environment } from '../enviroments/enviroments';
@Injectable({
  providedIn: 'root'
})
export class JuegosService {
  // indico que es un objeto de tipo Juego

  suscripcion: Subscription;

  gamesPrueba:juegoMain[] = [];
  private counter=0;

  constructor(private http: HttpClient) { }

  getJuegosApi(pagina:number,cadenaBusqueda:string,selectedGenres:number[],selectedPlatforms:number[]):Observable<juegoMain[]> {
    console.log("LA URLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL")
    console.log(environment.apiUrl);
    console.log("hace llamada manito a la pagina: "+pagina)

    let queryParams = `?page=${pagina}&value=${cadenaBusqueda}`

    for (let gender of selectedGenres) {
      queryParams += `&genders[]=${gender}`;
    }


    for (let platform of selectedPlatforms) {
      queryParams += `&platforms[]=${platform}`;
    }

    // return this.http.get<juegoMain[]>(`http://127.0.0.1:8000/api/v1/games/${queryParams}`);
    return this.http.get<juegoMain[]>(environment.apiUrl+`api/v1/games/${queryParams}`);

  }


  cerrarConexion(){
    this.suscripcion.unsubscribe();
  }



}
