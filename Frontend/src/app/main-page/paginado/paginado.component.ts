import { Component } from '@angular/core';
import { Paginas } from "../../interfaces/pagina";
import {PaginatorState} from "primeng/paginator";
import {MainPageComponent } from "../main-page.component";
import {juegoMain} from "../../interfaces/juego";
@Component({
  selector: 'app-paginado',
  templateUrl: './paginado.component.html',
  styleUrl: './paginado.component.css',
})

export class PaginadoComponent {
  // // Juego por el que empieza
  // first: number = 2;
  // // Total de juegos
  // totalRecords: number = 30;
  // // Juegos por pagina
  // rows: number = 15;
  //
  //
  // onPageChange(event: PaginatorState) {
  //
  //   this.first = event.first;
  //   this.rows = event.rows;
  //
  // }

}

