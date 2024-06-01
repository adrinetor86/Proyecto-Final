import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {ValidService} from "../servicios/validate.service";

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
  constructor(private http: HttpClient,private validateservice:ValidService) { }
  ngOnInit(): void {
     this.datosToken= this.getData();
     console.log("OHHH DIOS MIOS")
     console.log(this.datosToken.name)
    this.suscripcion= this.obtenerDatosUsuario(this.datosToken.name).subscribe({
      next: (value) => {
        console.log(value);
        this.datosUsuario = value['profile'];

      }
    });
  }
  getData() {
    const name= this.validateservice.getUserName();
    const rol = this.validateservice.getUserRole();
    console.log("holaaaa");
    console.log(name,rol);
    return {name,rol};
  }
  onSubmit() {
    // const id= this.formAccount.value.juegoId;
    // console.log("el id mi loko");
    // console.log(id);
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
         this.base64Image = reader.result as string;
        // Aquí tienes tu imagen en base64
        console.log(this.base64Image);

        this.pasarFoto(this.datosUsuario.username, this.base64Image);
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  pasarFoto(username: string,imagen: string) {
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    const body = new HttpParams()
      .set('new_picture', imagen);
    console.log(body.toString());
    this.http.post("http://127.0.0.1:8000/change_picture_profile/"+username+"/", body.toString(), { headers })
      .subscribe((response) => console.log(response));
  }
  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  obtenerDatosUsuario(username: string): Observable<Object> {
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    const body = new HttpParams()
      .set('username',username)

    return this.http.post("http://127.0.0.1:8000/your_profile/"+username+"/", body.toString(),{ headers });
  }
  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

}




