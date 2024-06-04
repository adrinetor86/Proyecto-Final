import {Component, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ValidService} from "../servicios/validate.service";
import {FiltrosService} from "../servicios/filtros.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, Subscription} from "rxjs";
import {JuegoPrueba} from "../interfaces/juego";
import {ActivatedRoute} from "@angular/router";
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
  constructor(private httpClient: HttpClient, private validateService: ValidService,private filtrosService:FiltrosService,
              private route: ActivatedRoute,) {}
  ngOnInit() {



    this.suscripcionFiltros=this.filtrosService.getFiltros().subscribe(filtros => {
      this.opcionesFiltro = filtros;
      this.generosOpciones=this.opcionesFiltro['genders']
      this.plataformasOpciones=this.opcionesFiltro['platforms']

      console.log(this.generosOpciones);
      console.log(this.plataformasOpciones);

    });
    this.suscripcionPrueba=
      this.route.params.subscribe(params => {
        this.httpClient.get('http://127.0.0.1:8000/api/v1/game/' + parseInt(params['id']) + '/').subscribe(JuegoRecibido => {
          console.log(JuegoRecibido)

          if (!JuegoRecibido['error']) {

            this.juegoPrueba = JuegoRecibido as JuegoPrueba;
            this.searchDot = this.juegoPrueba.synopsis.indexOf('.')
            this.arrPlataformas = this.juegoPrueba.plataforms.split(', ');
            this.arrGeneros = this.juegoPrueba.genders.split(', ');
            this.idJuego = parseInt(params['id']);
            console.log(this.arrPlataformas)
            console.log(this.arrGeneros)

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
    const genders = this.generos;
    const background_picture = this.image_preview_background;
    const plataforms = this.plataformas;
    const front_page = this.portada;
    const maps = this.mapasPrueba;


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

  updateGenres(genre: string, event: any) {
    if (event.target.checked) {
      this.game.genres.push(genre);
    } else {
      const index = this.game.genres.indexOf(genre);
      if (index > -1) {
        this.game.genres.splice(index, 1);
      }
    }
    this.generos=this.game.genres;
  }

  updatePlatforms(platform: string, event: any) {
    if (event.target.checked) {
      this.game.platforms.push(platform);
    } else {
      const index = this.game.platforms.indexOf(platform);
      if (index > -1) {
        this.game.platforms.splice(index, 1);
      }
    }
    this.plataformas=this.game.platforms;
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
          console.log("EL BASEEEEEE");
          // console.log(base64);
          this.game.maps.push(base64);
          this.mapasPrueba = this.game.maps;

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
