import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-info-game',
  templateUrl: './info-game.component.html',
  styleUrl: './info-game.component.css'
})
export class InfoGameComponent implements OnInit {
  //para sacar todos los datos del juego habria que crear un servicio que se conectará con la base de datos
  title: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    //me recupera el titulo del enlace
    this.route.params.subscribe(params => {
      this.title = params['title'];
    });
  }
}
