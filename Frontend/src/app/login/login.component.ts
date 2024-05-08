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
    const userNameValue= this.formAccount.value.username;
    const passwordValue = this.formAccount.value.password;
    console.log(userNameValue, passwordValue);
    this.validateService.testDataLogin(userNameValue, passwordValue).pipe(
      catchError(() => {
        this.errorValidate = true;
        return of(null);
      })
    ).subscribe(response=>{
      if (response!==null){
        this.route.navigate(['/']);
      }
    })
  }

}
