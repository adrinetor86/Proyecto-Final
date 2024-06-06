import {Component, ViewChild} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-subir-fotos',
  templateUrl: './subir-fotos.component.html',
  styleUrl: './subir-fotos.component.css'
})
export class SubirFotosComponent {
  @ViewChild('imageForm', { static: false }) formAccount: NgForm;
  selectedFile: File | null = null;
  base64Image: string = '';
  fileInputs = Array(5).fill(null);
  selectedFiles: File[] = []; // Array para almacenar los archivos seleccionados
  base64Images: string[] = []; // Array para almacenar las imágenes en base64
  subcripcion: Subscription;

  constructor(private http: HttpClient, private route: ActivatedRoute) {
  }
  // onSubmit() {
  //   const id= this.formAccount.value.juegoId;
  //   console.log("el id mi loko");
  //   console.log(id);
  //   if (this.selectedFile) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //        this.base64Image = reader.result as string;
  //       // Aquí tienes tu imagen en base64
  //       console.log(this.base64Image);
  //
  //       this.pasarFoto(id, this.base64Image);
  //     };
  //     reader.readAsDataURL(this.selectedFile);
  //   }
  // }

  onSubmit() {
    const id = this.formAccount.value.juegoId;
    console.log("El ID es:", id);

    // Convertir los archivos seleccionados a base64 y almacenarlos en el array base64Images
    this.base64Images = []; // Reiniciar el array de imágenes en base64
    let filesProcessed = 0;



    this.selectedFiles.forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = () => {
        this.base64Images[index] = reader.result as string;
        filesProcessed++;

        // Cuando todos los archivos hayan sido procesados, enviarlos al servidor
        if (filesProcessed === this.selectedFiles.length) {
          this.pasarFotos(28, this.base64Images);
        }
      };
      reader.readAsDataURL(file);
    });

  }


  pasarFoto(id: number, imagen: string) {
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    const body = new HttpParams()
      .set('id', id)
      .set('front_page', imagen);

    this.http.post("http://127.0.0.1:8000/insertar_guarro/", body.toString(), { headers })
      .subscribe((response) => console.log(response));
  }

  pasarFotos(id: number, Maps: string[]) {
    const headers = { 'Content-Type': 'application/json' };
    const body = {
      maps: Maps
    };
    console.log(body);
    this.http.post("http://127.0.0.1:8000/insert_maps/30/", JSON.stringify(body), { headers })
      .subscribe(response => console.log(response));
  }


  // onFileChange(event: any) {
  //   this.selectedFile = event.target.files[0];
  // }

  onFileChange(event: any, index: number) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFiles[index] = file;
    }
  }
}
