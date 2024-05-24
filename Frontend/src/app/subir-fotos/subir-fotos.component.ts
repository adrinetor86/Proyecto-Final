import {Component, ViewChild} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-subir-fotos',
  templateUrl: './subir-fotos.component.html',
  styleUrl: './subir-fotos.component.css'
})
export class SubirFotosComponent {
  @ViewChild('imageForm', { static: false }) formAccount: NgForm;
  selectedFile: File | null = null;
  base64Image: string = '';


  constructor(private http: HttpClient) {
  }
  onSubmit() {
    const id= this.formAccount.value.juegoId;
    console.log("el id mi loko");
    console.log(id);
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
         this.base64Image = reader.result as string;
        // Aquí tienes tu imagen en base64
        console.log(this.base64Image);

        this.pasarFoto(id, this.base64Image);
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  pasarFoto(id: number, imagen: string) {
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    const body = new HttpParams()
      .set('id', id)
      .set('front_page', imagen);

    this.http.post("http://127.0.0.1:8000/insertar_guarro/", body.toString(), { headers })
      .subscribe((response) => console.log(response));
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }


}
