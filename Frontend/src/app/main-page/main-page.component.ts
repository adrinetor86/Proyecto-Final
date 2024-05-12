import {Component,OnDestroy, OnInit} from '@angular/core';
import {JuegosService} from "../servicios/juegos.service";
import {Juego, juegoMain} from "../interfaces/juego";
import { Subscription} from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})

export class MainPageComponent implements OnInit,OnDestroy {
  games:Juego[]=[]
  gamesPrueba:juegoMain[]=[]
  private suscripcion: Subscription;

  constructor(private juegosservice:JuegosService) { }

  ngOnInit() {
    this.suscripcion = this.juegosservice.getJuegosApi().subscribe(juegos => {
      this.gamesPrueba = juegos['games'];
      console.log(this.gamesPrueba);

    });

    this.games = this.juegosservice.getJuegos();
    console.log(this.gamesPrueba);
  }

  ngOnDestroy() {
      this.suscripcion.unsubscribe();

  }


}

