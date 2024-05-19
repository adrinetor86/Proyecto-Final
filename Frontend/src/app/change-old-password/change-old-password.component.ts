import {Component, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ValidService} from "../servicios/validate.service";
import {Router} from "@angular/router";
import {RecoveryEmailService} from "../servicios/recoveryEmail.service";
import {catchError, of} from "rxjs";

@Component({
  selector: 'app-change-old-password',
  templateUrl: './change-old-password.component.html',
  styleUrl: './change-old-password.component.css'
})
export class ChangeOldPasswordComponent {
  @ViewChild('formChangePassword', { static: false }) formAccount: NgForm;
  errorValidate = false;
  errorMessage = '';
  constructor(private validateService: ValidService, private route:Router, private emailAccount: RecoveryEmailService) {
  }
  changeOldPasswordAccount(){
    const password = this.formAccount.value.newPassword;
    const email = this.emailAccount.email;
    this.validateService.changePasswordAccount(email,password).pipe(
      catchError(()=> {
        this.errorValidate = true;
        this.errorMessage = 'Error al cambiar la contraseña';
        return of(null);
      })
    ).subscribe(response =>{
      if (response!==null){
        this.route.navigate(['/login']);
      }
    })
    this.formAccount.reset();
  }
  cancelChangePassword(){
    this.route.navigate(['/login']);
  }
}
