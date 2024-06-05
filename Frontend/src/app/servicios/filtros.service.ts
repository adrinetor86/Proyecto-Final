import { Injectable } from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})


export class FiltrosService {

  suscripcion: Subscription;


  constructor(private http: HttpClient) {}

  getFiltros():Observable <any>{

    return this.http.get<any>("http://127.0.0.1:8000/get_filters");

  }

  cerrarConexion(){
    this.suscripcion.unsubscribe();
  }

}
