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
    const email = this.formNewAccount.value.emailNew;
    const username = this.formNewAccount.value.usernameNew;
    const password = this.formNewAccount.value.passwordNew;
    this.validService.registerNewUser(email, username, password).subscribe(resData =>{
      console.log(resData);
    });
  }
}
