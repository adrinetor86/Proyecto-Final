import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {NotFoundComponent} from "./not-found/not-found.component";
import {LoginComponent} from "./login/login.component";
import {MainPageComponent} from "./main-page/main-page.component";
import {InfoGameComponent} from "./info-game/info-game.component";
import {NewAccountComponent} from "./new-account/new-account.component";
import {ForgottenPasswordComponent} from "./forgotten-password/forgotten-password.component";

const appRoutes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'login', component: LoginComponent },
  // { path: 'infoGame', component: InfoGameComponent },
  { path: 'newAccount', component: NewAccountComponent },
  { path: 'forgottenPassword', component: ForgottenPasswordComponent },
  { path: 'infoGame/:id', component: InfoGameComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found', pathMatch: 'full'}
]
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports:[RouterModule]
})
export class AppRoutingModule {}
