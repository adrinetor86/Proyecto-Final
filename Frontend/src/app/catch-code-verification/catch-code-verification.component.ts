import {Component, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ValidService} from "../servicios/validate.service";
import {Router} from "@angular/router";
import {RecoveryEmailService} from "../servicios/recoveryEmail.service";
import {catchError, of} from "rxjs";

@Component({
  selector: 'app-catch-code-verification',
  templateUrl: './catch-code-verification.component.html',
  styleUrl: './catch-code-verification.component.css'
})
export class CatchCodeVerificationComponent {
  @ViewChild('formCodeVerify', { static: false }) formAccount: NgForm;
  errorValidate = false;
  errorMessage = '';
  constructor(private serviceValidate: ValidService, private router: Router, private emailAccountForggoten: RecoveryEmailService) {}
  verifyCode(){
    const code = this.formAccount.value.code;
    const email = this.emailAccountForggoten.email;
    this.serviceValidate.verifyCodeValidation(email,code).pipe(
      catchError(() => {
        this.errorValidate = true;
        this.errorMessage = 'El codigo proporcionado no es valido';
        return of(null);
      })
    ).subscribe(response =>{
      if (response!=null){
        localStorage.setItem("token", response['token'])
        this.router.navigate(['/changePassword']);
      }
    })
    this.formAccount.reset();
  }
  cancelSendCode(){
    this.router.navigate(['/forgottenPassword'])
  }
}
