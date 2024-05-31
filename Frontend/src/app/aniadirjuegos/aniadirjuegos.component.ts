import {Component, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";

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
    front_page: null as File | null,
    maps: [] as File[]
  };

  constructor(private httpClient: HttpClient) {}
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
      .set('genders', genders)
      .set('plataforms', plataforms)
      .set('front_page', front_page)
      .set('maps', maps)

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
      this.game.front_page = event.target.files[0];
    }
  }

  onMapChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.game.maps.push(event.target.files[i]);
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



}
