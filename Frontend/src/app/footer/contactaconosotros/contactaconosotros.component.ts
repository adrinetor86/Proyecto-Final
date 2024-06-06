import {Component, OnInit, ViewChild} from '@angular/core';
import {ValidService} from "../../servicios/validate.service";
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-contactaconosotros',
  templateUrl: './contactaconosotros.component.html',
  styleUrl: './contactaconosotros.component.css'
})
export class ContactaconosotrosComponent implements OnInit{
  @ViewChild('form', { static: false }) formAccount: NgForm;
username: string = '';

  constructor(private ValidateSercice: ValidService,
              private httpClient:HttpClient,private routerNavigate: Router,
              private tituloPagina:Title) {}





ngOnInit() {
  this.tituloPagina.setTitle("Contactanos")
  this.username=  this.ValidateSercice.getUserName();
}
  enviarCorreo() {
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

    const message = this.formAccount.value.message;
    const subject= this.formAccount.value.subject;
    let parametros;
    parametros = "?subject="+subject+"&message="+message;

     this.httpClient.get("http://127.0.0.1:8000/send_warn_email/"+this.username+"/"+parametros, { headers }).subscribe(

      response => {
        console.log(response);
        this.routerNavigate.navigate(['/']);
      },error => {
        console.log(error);
      }
    );
  }
}


