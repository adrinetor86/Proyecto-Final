import {Component,OnDestroy, OnInit,AfterViewInit,ViewChild} from '@angular/core';
import {JuegosService} from "../servicios/juegos.service";
import {Juego, juegoMain} from "../interfaces/juego";
import {Subject, Subscription} from 'rxjs';
import {BuscadorComponent} from "./buscador/buscador.component";
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})

export class MainPageComponent implements OnInit,OnDestroy {
  @ViewChild(BuscadorComponent) buscador: BuscadorComponent;
  games:Juego[]=[]
  gamesPrueba:juegoMain[]=[]
  currentPage: number = 1;
  totalGames: number;
  cadenaBusqueda: string = '';
  private suscripcion: Subscription;

  private getGamesSubject: Subject<void> = new Subject<void>();
  constructor(private juegosservice:JuegosService) { }

  ngOnInit() {

    this.getGamesSubject
      .subscribe({
        next: () => {
          this.suscripcion = this.juegosservice.getJuegosApi(this.currentPage,this.cadenaBusqueda).subscribe(juegos => {
            this.gamesPrueba = juegos['results'];
            this.currentPage = juegos['current_page'];

           this.totalGames = juegos['count_results'];
            console.log(this.gamesPrueba);
            // this.juegosFiltrados = [...this.gamesPrueba];
            this.games = this.juegosservice.getJuegos();
          });
        },

      });

    this.getGamesSubject.next();

  }

  onSearchTermChange(newTerm: string) {
    this.cadenaBusqueda = newTerm;
    this.getGamesSubject.next();

  }


  ngOnDestroy() {
      this.suscripcion.unsubscribe();

  }


  changePage(page: number) {
      this.currentPage = page;
      this.getGamesSubject.next();
  }


}

