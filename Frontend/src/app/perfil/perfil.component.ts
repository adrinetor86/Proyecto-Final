import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {catchError, Observable, of, Subscription} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {ValidService} from "../servicios/validate.service";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import { environment } from '../enviroments/enviroments';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit, OnDestroy{
  @ViewChild('imageForm', { static: false }) formAccount: NgForm;
  suscripcion: Subscription;
  username: string;
  datosUsuario: any;
  selectedFile: File | null = null;
  base64Image: string = '';
  datosToken: any;
  errorMessage = '';
  isFileInputEnabled: boolean;
  constructor(private http: HttpClient,private validateservice:ValidService,private route:Router,private tituloPagina:Title) { }
  ngOnInit(): void {
    this.tituloPagina.setTitle('Perfil');
    this.isFileInputEnabled = true;
     this.datosToken= this.getData();

    this.suscripcion= this.obtenerDatosUsuario(this.datosToken.name).subscribe({
      next: (value) => {
        // console.log(value);
        // console.log("f")
        this.datosUsuario = value['profile'];

      }
    });
    if(!this.validateservice.usuarioLogeado()){
      this.route.navigate(['/']).then(r => {});

    }
// console.log("pruebaaaaaaaaaaaaaaaaa")
//     console.log(this.datosUsuario.profile_picture)
  }
  getData() {
    const name= this.validateservice.getUserName();
    const rol = this.validateservice.getUserRole();
    // console.log("holaaaa");
    // console.log(name,rol);
    return {name,rol};
  }
  onSubmit() {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
         this.base64Image = reader.result as string;
        // Aquí tienes tu imagen en base64
        // console.log(this.base64Image);
        this.pasarFoto(this.datosUsuario.username, this.base64Image);
        // window.location.reload();
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  pasarFoto(username: string,imagen: string) {
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    const body = new HttpParams()
      .set('new_picture', imagen);
    // console.log("NUEVA FOTO")
    // console.log(body.toString());

    // console.log(imagen);
    // this.http.post("http://127.0.0.1:8000/change_picture_profile/"+username+"/", body.toString(), { headers })
    this.http.post(environment.apiUrl+"/change_picture_profile/"+username+"/", body.toString(), { headers })
      // .pipe(
      //   catchError((error) => {
      //     this.errorMessage = error.error;
      //     console.log(this.errorMessage);
      //     console.log("ERRRRRPRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR");
      //     return of(null);
      //   })
      // )
      .subscribe((response) => {

      });
  }
  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  obtenerDatosUsuario(username: string): Observable<Object> {
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    const body = new HttpParams()
      .set('username',username)

    // return this.http.post("http://127.0.0.1:8000/your_profile/"+username+"/", body.toString(),{ headers });
    return this.http.post(environment.apiUrl+"your_profile/"+username+"/", body.toString(),{ headers });
  }



  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

}




