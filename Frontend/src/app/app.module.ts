import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';
import {AppRoutingModule} from "./app.routing.module";
import {NotFoundComponent} from "./not-found/not-found.component";
import {InfoGameComponent} from "./info-game/info-game.component";
import {HeaderComponent } from './header/header.component';
import {AvatarModule} from "primeng/avatar";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { ToolbarModule } from 'primeng/toolbar';
import {SplitButtonModule} from "primeng/splitbutton";
import { NewAccountComponent } from "./login/new-account/new-account.component";
import { ForgottenPasswordComponent } from './login/forgotten-password/forgotten-password.component';
import { FooterComponent } from './footer/footer.component';
import { BuscadorComponent } from './main-page/buscador/buscador.component';
import { PaginadoComponent } from './main-page/paginado/paginado.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {CatchCodeVerificationComponent} from "./catch-code-verification/catch-code-verification.component";
import {ChangeOldPasswordComponent} from "./change-old-password/change-old-password.component";
import {LoginInterceptor} from "./interceptores/login.interceptor";
import {CarouselModule} from "primeng/carousel";
import {AuthInterceptor} from "./interceptores/auth.interceptor";
import {PaginatorModule} from "primeng/paginator";
import {PerfilComponent } from './perfil/perfil.component';
import { SubirFotosComponent } from './subir-fotos/subir-fotos.component';
import {ModalCommentComponent} from "./modal-comment/modal-comment.component";
import {MatButton} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {InputOtpModule} from "primeng/inputotp";
import { AniadirjuegosComponent } from './aniadirjuegos/aniadirjuegos.component';
import { QuienesomosComponent } from './footer/quienesomos/quienesomos.component';
import {TagModule} from "primeng/tag";
import {ChipModule} from "primeng/chip";
import { NuestroequipoComponent } from './footer/nuestroequipo/nuestroequipo.component';
import { ContactaconosotrosComponent } from './footer/contactaconosotros/contactaconosotros.component';
import {SidebarModule} from "primeng/sidebar";
import {ViewProfileComponent} from "./view-profile/view-profile.component";
import { LoaderComponent } from './loader/loader.component';
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import { EditarjuegosComponent } from './editarjuegos/editarjuegos.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainPageComponent,
    NotFoundComponent,
    InfoGameComponent,
    HeaderComponent,
    NewAccountComponent,
    ForgottenPasswordComponent,
    FooterComponent,
    BuscadorComponent,
    PaginadoComponent,
    CatchCodeVerificationComponent,
    ChangeOldPasswordComponent,
    PerfilComponent,
    SubirFotosComponent,
    ModalCommentComponent,
    AniadirjuegosComponent,
    QuienesomosComponent,
    NuestroequipoComponent,
    ContactaconosotrosComponent,
    ViewProfileComponent,
    LoaderComponent,
    EditarjuegosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToolbarModule,
    AvatarModule,
    BrowserAnimationsModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    TableModule,
    HttpClientModule,
    InputTextModule,
    DialogModule,
    ToolbarModule,
    ConfirmDialogModule,
    RatingModule,
    InputNumberModule,
    InputTextareaModule,
    RadioButtonModule,
    DropdownModule,
    ButtonModule,
    SplitButtonModule,
    NgxPaginationModule,
    CarouselModule,
    PaginatorModule,
    MatButton,
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    InputOtpModule,
    TagModule,
    ChipModule,
    SidebarModule,
    MatProgressSpinner,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoginInterceptor,
      multi: true
      },
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
