import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {JuegosService} from "../servicios/juegos.service";
import {isEmpty, Subscription} from "rxjs";
import {Juego, JuegoPrueba} from "../interfaces/juego";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-info-game',
  templateUrl: './info-game.component.html',
  styleUrl: './info-game.component.css'
})
export class InfoGameComponent implements OnInit,OnDestroy{
  //para sacar todos los datos del juego habria que crear un servicio que se conectará con la base de datos
  juego:Juego={title:'',url:'',id:0}

  juegoPrueba:JuegoPrueba={
    id:0,
    title:'',
    synopsis:'',
    developer:'',
    link_download:'',
    link_trailer:'',
    releaseDate:'',
    genders:'',
    plataforms:'',
    }
  respuestaError: boolean;
  subcripcion:Subscription;
  suscripcionPrueba: Subscription;
  seeMore = false;
  seeMoreButton = "Ver más";
  seeLess = "Ver menos";
  searchDot: number;

  constructor(private route: ActivatedRoute,private juegoservice:JuegosService, private http: HttpClient ) { }

  ngOnInit(): void {
    this.respuestaError= false;
    this.subcripcion=
     this.route.params.subscribe(params => {
        this.juego = this.juegoservice.getJuegobyId(parseInt(params['id']))

       })
    this.suscripcionPrueba=
      this.route.params.subscribe(params => {
        this.http.get('http://127.0.0.1:8000/api/v1/game/'+parseInt(params['id'])+'/').subscribe(JuegoRecibido => {
          console.log(JuegoRecibido)

          if(!JuegoRecibido['error']){
            this.juegoPrueba = JuegoRecibido as JuegoPrueba;
            this.searchDot = this.juegoPrueba.synopsis.indexOf('.')
          }else{
            this.juegoPrueba = JuegoRecibido['error']['error'];
            console.log("ERRORRRR")
            console.log(this.juegoPrueba);
          }
      },error => {
        this.respuestaError= true;
        console.log(error['error']['error']);

        });
     });
  }
  lookFullSynopsis(){
    return this.seeMore = !this.seeMore;
  }
  isEmpty(obj: any) {
    return Object.keys(obj).length > 0;
  };

  ngOnDestroy(){
    this.subcripcion.unsubscribe();
    this.suscripcionPrueba.unsubscribe();
  }
}
