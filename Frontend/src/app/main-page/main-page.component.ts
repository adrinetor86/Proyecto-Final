import {Component,OnDestroy, OnInit,AfterViewInit,ViewChild} from '@angular/core';
import {JuegosService} from "../servicios/juegos.service";
import {Juego, juegoMain} from "../interfaces/juego";
import { Subscription} from 'rxjs';
import {BuscadorComponent} from "./buscador/buscador.component";
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})

export class MainPageComponent implements OnInit,OnDestroy,AfterViewInit {
  @ViewChild(BuscadorComponent) buscador: BuscadorComponent;
  games:Juego[]=[]
  gamesPrueba:juegoMain[]=[]
  juegosFiltrados:juegoMain[]=[]
  private suscripcion: Subscription;


  constructor(private juegosservice:JuegosService) { }

  ngOnInit() {

    this.suscripcion = this.juegosservice.getJuegosApi().subscribe(juegos => {
      this.gamesPrueba = juegos['results'];
      console.log(this.gamesPrueba);
      this.juegosFiltrados = [...this.gamesPrueba];
     this.games = this.juegosservice.getJuegos();
    });



  }

  ngAfterViewInit(){
    if (this.buscador) {
      this.suscripcion = this.buscador.resultadosBusqueda.subscribe((termino: any)  => {
        this.juegosFiltrados = this.gamesPrueba.filter(game => game.title.includes(termino));
      });
    }
  }

  ngOnDestroy() {
      this.suscripcion.unsubscribe();

  }


}

