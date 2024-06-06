import {Component, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ValidService} from "../servicios/validate.service";
import {FiltrosService} from "../servicios/filtros.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, Subscription} from "rxjs";
import {JuegoPrueba} from "../interfaces/juego";
import {ActivatedRoute} from "@angular/router";
import {Mapas} from "../interfaces/mapas";
import {Title} from "@angular/platform-browser";
@Component({
  selector: 'app-editarjuegos',
  templateUrl: './editarjuegos.component.html',
  styleUrl: './editarjuegos.component.css'
})
export class EditarjuegosComponent {
  @ViewChild('form', {static: false}) formulario: NgForm;

  game = {
    title: '',
    link_trailer: '',
    link_download: '',
    release_date: '',
    synopsis: '',
    genres: [] as string[],
    platforms: [] as string[],
    front_page: null as string | null,
    background_picture: null as string | null,
    maps: [] as string []
  };

  juegoPrueba:JuegoPrueba={
    id:0,
    title:'',
    synopsis:'',
    developer:'',
    link_download:'',
    link_trailer:'',
    release_date:'',
    genders:'',
    plataforms:'',
    background_picture:'',
    front_page:'',
  }

  image_preview: string = null
  image_preview_background: string = null
  mapasPrueba: string[] | []
  plataformas: string[] = [];
  generos: string[] = [];
  portada: string;
  suscripcionFiltros: Subscription;
  opcionesFiltro: string[] = [];
  generosOpciones=[]
  plataformasOpciones=[]
  suscripcionPrueba: Subscription;
  selectedGenres: number[] = [];
  selectedPlatforms: number[] = [];
  searchDot: number;
  idJuego: number;
  respuestaError: boolean;
  arrPlataformas: string[] = [];
  arrGeneros: string[] = [];
  plataformasArray: string[] = [];
  front_page: string;
  maps: string[] = [];
  unifiedGeneros: string[] = [];
  mapasJuegos: Mapas[] =  [];
  mapas: string[] = [];

  constructor(private httpClient: HttpClient, private validateService: ValidService,private filtrosService:FiltrosService,
              private route: ActivatedRoute, private tituloPagina:Title) {}



ngOnInit() {
  this.tituloPagina.setTitle("Editar Juego")


    this.suscripcionFiltros=this.filtrosService.getFiltros().subscribe(filtros => {
      this.opcionesFiltro = filtros;
      this.generosOpciones=this.opcionesFiltro['genders']
      this.plataformasOpciones=this.opcionesFiltro['platforms']

    });
    this.suscripcionPrueba=
      this.route.params.subscribe(params => {
        this.httpClient.get('http://127.0.0.1:8000/api/v1/game/' + parseInt(params['id']) + '/').subscribe(JuegoRecibido => {
          console.log(JuegoRecibido)

          if (!JuegoRecibido['error']) {
            this.juegoPrueba = JuegoRecibido as JuegoPrueba;
            this.searchDot = this.juegoPrueba.synopsis.indexOf('.')
            this.plataformas= JuegoRecibido['plataforms'];
            this.generos= JuegoRecibido['genders'];
            this.front_page=JuegoRecibido['front_page'];
            this.maps=JuegoRecibido['maps'];
            console.log("MAPAS")
            console.log(this.maps)

            for (let i = 0; i < this.plataformas.length; i++) {
              this.plataformasArray.push(this.plataformas[i][1]);
            }

            for (let i = 0; i < this.generos.length; i++) {
              this.arrGeneros.push(this.generos[i][1]);
            }
            console.log("LOS GENEROS")
            console.log(this.arrGeneros);
            console.log("LAS PLATAFORMAS")
            console.log(this.plataformasArray);
            this.idJuego = parseInt(params['id']);

            this.httpClient.get('http://127.0.0.1:8000/get_maps/' + parseInt(params['id']) + '/').subscribe(MapasRecibidos => {

              this.mapasJuegos = MapasRecibidos as Mapas[];
              console.log(this.mapasJuegos);

              for (let i = 0; i < this.mapasJuegos['maps'].length; i++) {

                 this.mapas.push(this.mapasJuegos['maps'][i]);
              }
              console.log("el mapa")
              console.log(this.mapas);
            });

          } else {
            this.juegoPrueba = JuegoRecibido['error']['error'];

            console.log("ERRORRRR")
            console.log(this.juegoPrueba);
          }
        }, error => {
          this.respuestaError = true;
          console.log(error['error']['error']);

        });

      });


  }

  formularioJuego() {

    const title = this.formulario.value.title;
    const link_trailer = this.formulario.value.link_trailer;
    const link_download = this.formulario.value.link_download;
    const release_date = this.formulario.value.release_date;
    const developer = this.formulario.value.developer;
    const synopsis = this.formulario.value.synopsis;
    const genders = this.arrGeneros
    const background_picture = this.game.front_page ? this.game.front_page : this.juegoPrueba.background_picture;
    const plataforms = this.plataformasArray;
    const front_page = this.portada ? this.portada : this.front_page
    const maps = this.mapas

    console.log("LOS ARR GENEROS");
    console.log(this.arrGeneros)

    console.log("LOS GENEROS");
    console.log(this.generos)
    console.log("LOS GENEROS unidos");
    console.log(this.unifiedGeneros)
    this.editarJuego(title, link_trailer, link_download, release_date, developer, synopsis, genders,background_picture, plataforms, front_page, maps).subscribe(response => {
      console.log(response);
    });

  }
  editarJuego(title: string, link_trailer: string, link_download: string, release_date, developer, synopsis, genders,background_picture, plataforms, front_page, maps): Observable<Object> {

    const headers = {'Content-Type': 'application/x-www-form-urlencoded'};
    // const body = new HttpParams()
    const body ={
      title: title,
      link_trailer: link_trailer,
      link_download: link_download,
      release_date: release_date,
      developer: developer,
      synopsis: synopsis,
      genders: genders,
      background_picture: background_picture,
      plataforms: plataforms,
      front_page: front_page,
      maps: maps,
      username: this.validateService.getUserName(),
      id:this.idJuego
    }

    console.log("EL BODY");
    console.log(body);
    // console.log("EL JSONNNN");
    // console.log(maps.toString());
    return this.httpClient.post("http://127.0.0.1:8000/edit_game/",  body, {headers});
  }

  arrayContains:number []=[];
  updateArray(id: string, arr: any): void {
    console.log(arr);
    const index = arr.indexOf(id);
    if (index > -1) {
      // El id ya está en el array, lo eliminamos
      arr.splice(index, 1);
    } else {
      // El id no está en el array, lo agregamos
      arr.push(id);
    }
    this.arrayContains=arr;
    console.log(this.arrayContains);
  }
  updateMapas(base: string, arr: any): void {
    console.log(arr);
    const index = arr.indexOf(base);
    if (index > -1) {
      // El id ya está en el array, lo eliminamos
      arr.splice(index, 1);
    } else {
      // El id no está en el array, lo agregamos
      arr.push(base);
    }
    this.arrayContains=arr;
    console.log("UPDATE MAPASSSS");
    console.log(this.arrayContains);
  }



  resetForm() {
    this.game = {
      title: '',
      link_trailer: '',
      link_download: '',
      release_date: '',
      synopsis: '',
      genres: [],
      platforms: [],
      front_page: null,
      background_picture: null,
      maps: []
    };
    this.image_preview = null
    this.image_preview_background = null
  }

  onImageChange_front(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.convertToBase64(file).then((base64: string) => {
        this.image_preview = base64;
        this.game.front_page = base64;
        this.portada=this.game.front_page;
      });
    }
  }

  onImageChange_background(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.convertToBase64(file).then((base64: string) => {
        this.image_preview_background = base64;
        this.game.front_page = base64;
      });
    }
  }

  onMapChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        const file = event.target.files[i];
        this.convertToBase64(file).then((base64: string) => {
          this.game.maps.push(base64);
          this.mapasPrueba = this.game.maps;

          // this.updateMapas(base64, this.mapas)
          this.updateMapas(base64, this.mapas)
          console.log("mapas pruebaaaa");
          console.log(this.mapasPrueba);
          // this.game.maps.push(base64);
        });
      }
    }
  }
  addMap() {
    const mapsCreated = document.querySelectorAll('input[name="maps"]').length

    if (mapsCreated < 7) {
      const mapInput = document.createElement('input');
      mapInput.type = 'file';
      mapInput.accept = 'image/*';
      mapInput.classList.add('form-control');
      mapInput.name = 'maps'
      mapInput.addEventListener('change', (event: any) => this.onMapChange(event));
      document.querySelector('.add')?.before(mapInput);
    }
  }


  private convertToBase64(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      console.log("Converting to base64");
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        const result = reader.result as string;
        // this.mapasPrueba.push(result);
        // console.log('Base64 conversion result:', result);
        resolve(result);
        console.log('Base64 conversion result:', this.mapasPrueba);
      };

      reader.onerror = error => {
        console.error('Error during base64 conversion:', error);
        reject(error);
      };
    });
  }


}
