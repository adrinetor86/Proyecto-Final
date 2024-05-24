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
  totalGames: number = 37;

  private suscripcion: Subscription;

  private getGamesSubject: Subject<void> = new Subject<void>();
  constructor(private juegosservice:JuegosService) { }

  ngOnInit() {


    this.getGamesSubject
      .subscribe({
        next: () => {
          this.suscripcion = this.juegosservice.getJuegosApi(this.currentPage).subscribe(juegos => {
            this.gamesPrueba = juegos['results'];
            this.currentPage = juegos['current_page'];
            // this.totalGames = juegos['totalGames'];
            console.log(this.gamesPrueba);
            // this.juegosFiltrados = [...this.gamesPrueba];
            this.games = this.juegosservice.getJuegos();
          });

        },

      });

    this.getGamesSubject.next();

  }

  // ngAfterViewInit(){
  //   if (this.buscador) {
  //     this.suscripcion = this.buscador.resultadosBusqueda.subscribe((termino: any)  => {
  //       this.juegosFiltrados = this.gamesPrueba.filter(game => game.title.includes(termino));
  //     });
  //   }
  // }

  ngOnDestroy() {
      this.suscripcion.unsubscribe();

  }


  changePage(page: number) {
      this.currentPage = page;
     this.getGamesSubject.next();
  }


}

