import {Component, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ValidService} from "../servicios/validate.service";
import {Router} from "@angular/router";
import {catchError, of} from "rxjs";


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

  loginUser(){
    const email= this.formAccount.value.email;
    const passwordValue = this.formAccount.value.password;
    this.validateService.testDataLogin(email, passwordValue).pipe(
      catchError((error) => {
        this.errorValidate = true;
        this.errorMessage = 'Credenciales incorrectas';
        console.log(error);
        return of(null);
      })
    ).subscribe(response=>{
      if (response!==null){
        this.route.navigate(['/']);
      }
    })
    this.formAccount.reset();
  }
  cancelLogin(){
    this.route.navigate(['/']);
  }

}
