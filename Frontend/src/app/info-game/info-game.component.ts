import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {JuegosService} from "../servicios/juegos.service";
import {Subscription} from "rxjs";
import {Juego} from "../interfaces/juego";


@Component({
  selector: 'app-info-game',
  templateUrl: './info-game.component.html',
  styleUrl: './info-game.component.css'
})
export class InfoGameComponent implements OnInit,OnDestroy{
  //para sacar todos los datos del juego habria que crear un servicio que se conectará con la base de datos
  juego:Juego={title:'',url:'',id:0}
  subcripcion:Subscription;
  constructor(private route: ActivatedRoute,private juegoservice:JuegosService) { }

  ngOnInit(): void {
    this.subcripcion=
     this.route.params.subscribe(params => {
        this.juego = this.juegoservice.getJuegobyId(parseInt(params['id']))
     });
  }

  ngOnDestroy(){
    this.subcripcion.unsubscribe();
  }
}
