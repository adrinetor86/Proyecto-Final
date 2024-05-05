import {Component, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ValidService} from "../servicios/validate.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @ViewChild('form', { static: false }) formAccount: NgForm;
  constructor(private validateService: ValidService, private route:Router) { }
  errorMessage = '';
  errorValidate = false;

  onSubmit(){
    const userNameValue= this.formAccount.value.username;
    const passwordValue = this.formAccount.value.password;
    console.log(userNameValue, passwordValue);
    // if (this.validateService.validateUser(userNameValue,passwordValue)){
    //   this.route.navigate(["/"]);
    // }
    // else{
    //   this.errorValidate = true;
    //   this.errorMessage = "Usuario o contraseña incorrectos";
    //   this.formAccount.reset();
    // }
  }

}
