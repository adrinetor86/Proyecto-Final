import {Component, OnInit, ViewChild} from '@angular/core';
import {ValidService} from "../../servicios/validate.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {catchError, of} from "rxjs";
import {RecoveryEmailService} from "../../servicios/recoveryEmail.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrl: './forgotten-password.component.css'
})
export class ForgottenPasswordComponent  implements OnInit {
  @ViewChild('formForgotten', { static: false }) formAccount: NgForm;
  errorMessage = '';
  errorValidate = false;
  constructor(private validateService: ValidService, private route:Router, private emailAccountForgotten: RecoveryEmailService,private tituloPagina:Title) {}


  ngOnInit() {
    scrollTo(0,0);
    this.tituloPagina.setTitle('Recuperar contraseña');
  }

  recoveryPassword(){
    this.emailAccountForgotten.email = this.formAccount.value.email;
    this.validateService.sendCodeRecoveryPassword(this.emailAccountForgotten.email).pipe(
      catchError(() => {
        this.errorValidate = true;
        this.errorMessage = 'El email proporcionado no existe';
        return of(null);
      })
    ).subscribe(response=>{
      if (response!==null){
        this.route.navigate(['/codeVerification']);
      }
    })
    this.formAccount.reset();
  }
  cancelRecoveryPassword(){
    this.route.navigate(['/login']);
  }
}
