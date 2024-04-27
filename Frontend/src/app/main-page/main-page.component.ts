import {Component, OnInit} from '@angular/core';
import {JuegosService} from "../servicios/juegos.service";
import {Juego} from "../interfaces/juego";


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})

export class MainPageComponent implements OnInit {
  games:Juego[]=[]
  constructor(private juegosservice:JuegosService) { }

  ngOnInit() {
    this.games = this.juegosservice.getJuegos();
  }


}

