import {Component, OnDestroy, OnInit,Renderer2,Inject, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {JuegosService} from "../servicios/juegos.service";
import {catchError, of, Subscription} from "rxjs";
import {Juego, JuegoPrueba} from "../interfaces/juego";
import {HttpClient} from "@angular/common/http";
import {ValidService} from "../servicios/validate.service";
import {NgForm} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {ModalCommentComponent} from "../modal-comment/modal-comment.component";
import {Mapas} from "../interfaces/mapas";
import {MapasService} from "../servicios/mapaJuegos.service";
import { DOCUMENT } from '@angular/common';
import {CommentService} from "../servicios/comment.service";
@Component({
  selector: 'app-info-game',
  templateUrl: './info-game.component.html',
  styleUrl: './info-game.component.css'
})
export class InfoGameComponent implements OnInit,OnDestroy{
  @ViewChild('formComments', { static: false }) formCommentsValue: NgForm;
  @ViewChild('formCommentsChild', { static: false }) formCommentsChildValue: NgForm;
  //para sacar todos los datos del juego habria que crear un servicio que se conectará con la base de datos
  mapas: Mapas[] | undefined;

  responsiveOptions: any[] | undefined;
  mapasJuegos: Mapas[] | undefined;
  juego:Juego={title:'',url:'',id:0}

  juegoPrueba:JuegoPrueba={
    id:0,
    title:'',
    synopsis:'',
    developer:'',
    link_download:'',
    link_trailer:'',
    release_date:'',
    genders:'',
    plataforms:'',
    front_page:'',
    }

  gameComment: any;
  gameCommentChild = {}
  respuestaError: boolean;
  subcripcion:Subscription;
  suscripcionPrueba: Subscription;
  suscriptionComment: Subscription;
  suscriptionMapas: Subscription;
  mostrarComentarios = false;
  noCommentsMessageGame = "Actualmente no hay comentarios para este juego";
  seePhotoUser;
  idCommentFather = 0;
  seeMore = false;
  seeMoreButton = "Ver más";
  seeLess = "Ver menos";
  searchDot: number;
  mostrarFormHijo = false;
  mostrarBotonesFormPadre = false;
  mostrarBotonesResponderComment = true;
  indiceComentario;
  userRoleSubscription: Subscription;
  errorMessage: string = '';
  userCommentFather: any;
  arrPlataformas: string[] = ['PC','Play Station','Xbox','Nintendo','Android','iOS'];
  isAdmin = false;
  arrGeneros: string[] = ['Fantastico', 'RPG', 'Animacion',
                          'Supervivencia', 'Aventura', 'Accion',
                          'Arcade', 'Deportes', 'Estrategia',
                          'Simulacion', 'Juegos de mesa', 'Shooter',
                          'Terror', 'Rol', 'Puzzle'];
  errorValidate = false;
  constructor(private route: ActivatedRoute, private juegoservice:JuegosService, private routerNavigate: Router,
              private http: HttpClient, private isLoginUser: ValidService,public dialog: MatDialog,
              private mapaService: MapasService,private renderer: Renderer2,
              @Inject(DOCUMENT) private document: Document, private commentService:CommentService,private validateService:ValidService) { }
  // TOCAR AQUI PARA PONER LA IMAGEN

  ngOnInit(): void {

    this.renderer.setStyle(this.document.body, 'background', '#161a3a');


    this.respuestaError= false;



    this.suscripcionPrueba=
      this.route.params.subscribe(params => {
        this.http.get('http://127.0.0.1:8000/api/v1/game/' + parseInt(params['id']) + '/').subscribe(JuegoRecibido => {
          console.log(JuegoRecibido)

          if (!JuegoRecibido['error']) {

            this.juegoPrueba = JuegoRecibido as JuegoPrueba;
            this.searchDot = this.juegoPrueba.synopsis.indexOf('.')
            this.arrPlataformas = this.juegoPrueba.plataforms.split(', ');
            this.arrGeneros = this.juegoPrueba.genders.split(', ');
            console.log(this.arrGeneros)
          } else {
            this.juegoPrueba = JuegoRecibido['error']['error'];

            console.log("ERRORRRR")
            console.log(this.juegoPrueba);
          }
        }, error => {
          this.respuestaError = true;
          console.log(error['error']['error']);

        });

        this.http.get('http://127.0.0.1:8000/get_maps/' + parseInt(params['id']) + '/').subscribe(MapasRecibidos => {

          this.mapasJuegos = MapasRecibidos as Mapas[];
          console.log(this.mapasJuegos)
          console.log("MAPAS")
          console.log(this.mapasJuegos)


          this.mapaService.getMapassSmall(this.mapasJuegos).then((mapas) => {
            this.mapasJuegos = mapas;
          });
          this.responsiveOptions = [
            {
              breakpoint: '1199px',
              numVisible: 4,
              numScroll: 3
            },
            {
              breakpoint: '800px',
              numVisible: 1,
              numScroll: 1
            },
            {
              breakpoint: '767px',
              numVisible: 1,
              numScroll: 2
            }
          ];
        });
      });
    this.userRoleSubscription = this.validateService.userRole.subscribe((role: number) => {

      console.log(role);
      this.isAdmin = role === 1;
    });
    this.suscriptionComment = this.route.params.subscribe(params=>{
      const gameId = params['id'];
      this.http.get(`http://127.0.0.1:8000/api/v1/game/${gameId}/`).subscribe((response:any)=>{
        this.gameComment = response.comments;
        this.verificarCampoNext();
        this.fotoUsuario();
        console.log(this.gameComment)
      })
    });
  }
  fotoUsuario(){
    this.gameComment.forEach((comment: { profile_picture: any; }, index: string | number)=>{
        this.seePhotoUser =this.gameComment[index].photoUser = comment.profile_picture;
        return this.seePhotoUser;
    });
  }
  verificarCampoNext() {
    this.gameComment.forEach((comment: { next: any; }, index: string | number) => {

      if (comment.next) {
        this.gameComment[index].nextFieldValue = comment.next;
        console.log(this.gameComment[index].nextFieldValue);
      }
    });
  }

  aniadirComentario() {
    if (this.isLoginUser.usuarioLogeado()) {
      console.log("entraa")
      let commentValue = this.formCommentsValue.value.commentValue;
      console.log(commentValue);
      this.commentService.insertCommentFather(commentValue, this.juegoPrueba.id).pipe(
        catchError((error) => {
          this.errorValidate = true;
          this.errorMessage = '⚠️Error al insertar el comentario';
           console.log(error);
          return of(null);
        })
      ).subscribe(response => {
        if (response != null) {
          window.location.reload();
        }
      })
    } else {
      this.dialog.open(ModalCommentComponent);
    }
  }
  mostrarComentarioHijo(indice: number) {
    this.mostrarComentarios = !this.mostrarComentarios;
    const fieldNextUrlValue = this.gameComment[indice].nextFieldValue;
    if (fieldNextUrlValue) {
      this.http.get(`http://127.0.0.1:8000${fieldNextUrlValue}`).subscribe((response: any) => {
        this.gameCommentChild[indice] = response.comments;
      });
    }
  }
  cancelarComentario(){
    this.indiceComentario = null;
    this.mostrarBotonesResponderComment = true;
    this.mostrarBotonesFormPadre = false;
  }

  mostrarFormComentarioHijo(indice:number){
    this.mostrarBotonesResponderComment = false;
    this.indiceComentario=indice;
    this.idCommentFather = this.gameComment[indice].id_comment;
    // const idComentarioPadre = this.gameComment[indice].nextFieldValue.match(/\/comment\/\d+\/(\d+)\//);
    // this.idCommentFather = idComentarioPadre[1];
    // alert(this.idCommentFather);

    this.userCommentFather = '@'+this.gameComment[indice].user;
  }

  aniadirComentarioHijo(){
    if (this.isLoginUser.usuarioLogeado()){
      let commentValue = this.formCommentsChildValue.value.commentValueChild;
      this.commentService.insertCommentChild(commentValue, this.juegoPrueba.id,this.idCommentFather).pipe(
        catchError((error) => {
          this.errorValidate = true;
          this.errorMessage = '⚠️Error al insertar el comentario';
          console.log(error);
          return of(null);
        })
      ).subscribe(response => {
        if (response != null) {
          window.location.reload();
        }
      })
    }
    else {
      this.dialog.open(ModalCommentComponent);
    }
  }
  viewProfile(usuario:string){
    const usernameFather = usuario.substring(1, usuario.indexOf(' '));
    this.routerNavigate.navigate(['/viewProfile/',usernameFather]);
  }

  lookFullSynopsis(){
    return this.seeMore = !this.seeMore;
  }
  isEmpty(obj: any) {
    return Object.keys(obj).length > 0;
  };

  ngOnDestroy(){

    this.suscripcionPrueba.unsubscribe();
    this.renderer.setStyle(this.document.body, 'background', 'var(--background-image)');
  }
}
