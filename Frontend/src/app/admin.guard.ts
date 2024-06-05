import { inject } from "@angular/core"
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import {ValidService} from "./servicios/validate.service";

export const adminGuard = () => {
  const router: Router = inject(Router);
  const validateService: ValidService = inject(ValidService);
  let loggedInSubscription: Subscription;
  let isUserLoggedIn: boolean = false;
  let comprobarAdmin: boolean = false;

  // Sirve para comprobar si el usario logado es admin o no
  loggedInSubscription = validateService.isLogged.subscribe(
    (loggedIn: boolean): void => {
      isUserLoggedIn = loggedIn;
      if (isUserLoggedIn) {
        if (validateService.getUserRole() === 1){
          comprobarAdmin = true;
        }else{
          router.navigate(['/']).then(r => { });
        }
      }
    }
  )

  return comprobarAdmin;
}
