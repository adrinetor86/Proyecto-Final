import {Component, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ValidService} from "../../servicios/validate.service";

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrl: './new-account.component.css'
})
export class NewAccountComponent {
  @ViewChild('formNewAccount', { static: false }) formNewAccount: NgForm;
  constructor(private validService: ValidService) {
  }
  registerNewUser(): void {
    const usernameValue = this.formNewAccount.value.usernameNew;
    const email = this.formNewAccount.value.emailNew;
    const password = this.formNewAccount.value.passwordNew;
    const rol = 1;
    console.log(usernameValue,email,password)
    this.validService.registerNewUser(email, usernameValue, password, rol).subscribe(resData =>{
      console.log(resData);
    });
    this.formNewAccount.reset();
  }
}
