import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {NotFoundComponent} from "./not-found/not-found.component";
import {LoginComponent} from "./login/login.component";
import {MainPageComponent} from "./main-page/main-page.component";
import {InfoGameComponent} from "./info-game/info-game.component";
import {NewAccountComponent} from "./login/new-account/new-account.component";
import {ForgottenPasswordComponent} from "./login/forgotten-password/forgotten-password.component";

import {CatchCodeVerificationComponent} from "./catch-code-verification/catch-code-verification.component";
import {ChangeOldPasswordComponent} from "./change-old-password/change-old-password.component";
import {PerfilComponent} from "./perfil/perfil.component";
import {SubirFotosComponent} from "./subir-fotos/subir-fotos.component";
import {AniadirjuegosComponent} from "./aniadirjuegos/aniadirjuegos.component";
import {QuienesomosComponent} from "./footer/quienesomos/quienesomos.component";
import {NuestroequipoComponent} from "./footer/nuestroequipo/nuestroequipo.component";
import {ContactaconosotrosComponent} from "./footer/contactaconosotros/contactaconosotros.component";

const appRoutes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'newAccount', component: NewAccountComponent },
  { path: 'forgottenPassword', component: ForgottenPasswordComponent },
  { path: 'infoGame/:id', component: InfoGameComponent },
  { path: 'codeVerification', component: CatchCodeVerificationComponent},
  { path: 'changePassword', component: ChangeOldPasswordComponent},
  { path: 'not-found', component: NotFoundComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'testeo', component: SubirFotosComponent },
  { path: 'aniadirJuegos', component: AniadirjuegosComponent },
  { path: 'sobreNosotros', component: QuienesomosComponent },
  { path: 'nuestroEquipo', component: NuestroequipoComponent },
  { path: 'contactaConNosotros', component: ContactaconosotrosComponent },
  { path: '**', redirectTo: '/not-found', pathMatch: 'full'}
]
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports:[RouterModule]
})
export class AppRoutingModule {}
