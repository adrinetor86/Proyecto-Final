import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ValidService} from "../servicios/validate.service";
import {Router} from "@angular/router";
import {catchError, of} from "rxjs";
import {Title} from "@angular/platform-browser";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  @ViewChild('form', { static: false }) formAccount: NgForm;
  constructor(private validateService: ValidService, private route:Router,private tituloPagina:Title) { }
  errorMessage = '';
  errorValidate = false;

ngOnInit() {
  this.tituloPagina.setTitle('Login');
  if(this.validateService.usuarioLogeado()){
    this.route.navigate(['/']).then(r => {});

  }
  this.loginUser();
}




  loginUser(){
    const email= this.formAccount.value.email;
    const passwordValue = this.formAccount.value.password;
    this.validateService.testDataLogin(email, passwordValue).pipe(
      catchError((error) => {
        this.errorValidate = true;
        this.errorMessage = '⚠️Credenciales incorrectas';
        console.log(error);
        return of(null);
      })
    ).subscribe(response=>{
      if (response!==null) {
          localStorage.setItem('username', response['username'])
        this.route.navigate(['/']);
      }
    })
    this.formAccount.reset();
  }
  cancelLogin(){
    this.route.navigate(['/']);
  }

}
