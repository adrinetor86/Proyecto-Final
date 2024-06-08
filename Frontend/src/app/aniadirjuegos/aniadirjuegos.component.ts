import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ValidService} from "../servicios/validate.service";
import {FiltrosService} from "../servicios/filtros.service";
import {Title} from "@angular/platform-browser";
@Component({
  selector: 'app-aniadirjuegos',
  templateUrl: './aniadirjuegos.component.html',
  styleUrl: './aniadirjuegos.component.css'
})
export class AniadirjuegosComponent implements OnInit, OnDestroy {
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

  constructor(private httpClient: HttpClient, private validateService: ValidService,private filtrosService:FiltrosService,private tituloPagina:Title) {
  }







ngOnInit() {
  this.tituloPagina.setTitle("Añadir Juego")

    this.suscripcionFiltros=this.filtrosService.getFiltros().subscribe(filtros => {
      this.opcionesFiltro = filtros;
      this.generosOpciones=this.opcionesFiltro['genders']
      this.plataformasOpciones=this.opcionesFiltro['platforms']

      console.log(this.generosOpciones);
      console.log(this.plataformasOpciones);

    });

  }
  ngOnDestroy() {
    this.suscripcionFiltros.unsubscribe();
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


    this.enviarJuego(title, link_trailer, link_download, release_date, developer, synopsis, genders,background_picture, plataforms, front_page, maps).subscribe(response => {
      console.log(response);
    });

  }

  enviarJuego(title: string, link_trailer: string, link_download: string, release_date, developer, synopsis, genders,background_picture, plataforms, front_page, maps): Observable<Object> {

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
      username: this.validateService.getUserName()
    }


    console.log("EL BODY");
    console.log(body);

    return this.httpClient.post("http://127.0.0.1:8000/new_game/",  body, {headers});
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


  onSubmit() {
    console.log(this.game);
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

  // private convertToBase64(file: File): Promise<string> {
  //   return new Promise<string>((resolve, reject) => {
  //     console.log("Converting to base64");
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     console.log(reader.result as string)
  //     reader.onload = () => resolve(reader.result as string);
  //
  //     reader.onerror = error => reject(error);
  //   });
  // }
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
