import { Component, Output, EventEmitter  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Subject } from 'rxjs';
// import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrl: './buscador.component.css'
})
export class BuscadorComponent {

  @Output() resultadosBusqueda = new EventEmitter<any>();
  // private terminoBusqueda = new Subject<string>();
  constructor(private http: HttpClient) {
    // this.terminoBusqueda.pipe(
    //   debounceTime(300)
    // ).subscribe(termino => this.resultadosBusqueda.emit(termino));
  }

  buscar(termino: any): void {
    this.resultadosBusqueda.emit(termino);
  }

}
