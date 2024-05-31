import {Component, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ValidService} from "../servicios/validate.service";
@Component({
  selector: 'app-aniadirjuegos',
  templateUrl: './aniadirjuegos.component.html',
  styleUrl: './aniadirjuegos.component.css'
})
export class AniadirjuegosComponent {
  @ViewChild('form', { static: false }) formulario: NgForm;

  game = {
    title: '',
    link_trailer: '',
    link_download: '',
    release_date: '',
    synopsis: '',
    genres: [] as string[],
    platforms: [] as string[],
    front_page: null as string  | null,
    maps: [] as string []
  };

  constructor(private httpClient: HttpClient,private validateService:ValidService) {}
  formularioJuego(){
    const title= this.formulario.value.title;
    const link_trailer = this.formulario.value.link_trailer;
    const link_download = this.formulario.value.link_download;
    const release_date = this.formulario.value.release_date;
    const developer = this.formulario.value.developer;
    const synopsis = this.formulario.value.synopsis;
    const genders = this.formulario.value.genders;
    const plataforms = this.formulario.value.plataforms;
    const front_page = this.formulario.value.front_page;
    const maps = this.formulario.value.maps;

    this.enviarJuego(title, link_trailer,link_download,release_date,developer,synopsis,genders,plataforms,front_page,maps).subscribe(response => {
      console.log(response);
    });

  }

  enviarJuego(title: string, link_trailer: string,link_download :string,release_date,developer,synopsis,genders,plataforms,front_page,maps): Observable<Object> {

    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    const body = new HttpParams()
      .set('title', title)
      .set('link_trailer', link_trailer)
      .set('link_download',link_download)
      .set('release_date', release_date)
      .set('developer', developer)
      .set('synopsis', synopsis)
      .set('genders', JSON.stringify(genders))
      .set('plataforms', JSON.stringify(plataforms))
      .set('front_page', front_page)
      .set('maps', JSON.stringify(maps))
      .set('username',this.validateService.getUserName());

      console.log(body.toString());
    return this.httpClient.post("http://127.0.0.1:8000/new_game/", body.toString(), { headers });
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
  }


  onSubmit() {
    console.log(this.game);
  }

  onImageChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.convertToBase64(file).then((base64: string) => {
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
        });
      }
    }
  }



  addMap() {
    const mapInput = document.createElement('input');
    mapInput.type = 'file';
    mapInput.accept = 'image/*';
    mapInput.classList.add('form-control');
    mapInput.addEventListener('change', (event: any) => this.onMapChange(event));
    document.querySelector('.block4')?.appendChild(mapInput);
  }

  private convertToBase64(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }


}
