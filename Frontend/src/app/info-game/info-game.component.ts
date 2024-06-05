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
import Swal from 'sweetalert2';
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
    background_picture:''
    }

  gameComment: any;
  gameCommentChild = {}
  respuestaError: boolean;
  subcripcion:Subscription;
  contador = 0;
  suscripcionPrueba: Subscription;
  suscriptionComment: Subscription;
  suscriptionMapas: Subscription;
  mostrarComentarios: boolean[] = [];
  mostrarComentarios2: boolean[] = [];
  noCommentsMessageGame = "Actualmente no hay comentarios para este juego";
  idCommentFather = 0;
  seeMore = false;
  seeMoreButton = "Ver más";
  seeLess = "Ver menos";
  valorNextComentarioSiguiente;
  searchDot: number;
  mostrarBotonesFormPadre = false;
  mostrarBotonesResponderComment = true;
  indiceComentario;
  userRoleSubscription: Subscription;
  errorMessage: string = '';
  userCommentFather: any;
  isAdmin = false;
  arrGeneros: string[] = [];
  errorValidate = false;
  idJuego: number;
  plataformas: [] ;
  generos: [] ;
  plataformasArray:string[] =[];
  suscripcionBorrar: Subscription;
  background_picture:string;
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
           this.idJuego = parseInt(params['id']);
            this.juegoPrueba = JuegoRecibido as JuegoPrueba;
            this.searchDot = this.juegoPrueba.synopsis.indexOf('.')
            // this. arrPlataformas= this.juegoPrueba.plataforms.split(', ');
            this.plataformas= JuegoRecibido['plataforms'];
             this.generos= JuegoRecibido['genders'];
             this.background_picture=JuegoRecibido['background_picture'];

            for (let i = 0; i < this.plataformas.length; i++) {

              this.plataformasArray.push(this.plataformas[i][0]);
            }

            for (let i = 0; i < this.generos.length; i++) {

              this.arrGeneros.push(this.generos[i][0]);
            }
            console.log(this.plataformasArray)
            console.log(this.arrGeneros)


          } else {
            this.juegoPrueba = JuegoRecibido['error']['error'];

            console.log("ERRORRRR")
            console.log(this.juegoPrueba);
          }
        }, error => {
          this.respuestaError = true;
          console.log(error['error']['error']);
          this.routerNavigate.navigate(['/not-found'])
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
    this.gameComment.forEach((comment: { profile_picture: any; }) => {
      return comment.profile_picture;
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
onDelete(){
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
     const id= this.route.snapshot.params['id'];
     this.suscripcionBorrar= this.route.params.subscribe(params=>{
       const body={
          id: id,
          username: this.validateService.getUserName()
       }

       this.http.post(`http://127.0.0.1:8000/delete_game/${id}/`,body).subscribe((response)=>{

      console.log(response);
       })

     });
     this.routerNavigate.navigate(['/']);
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
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
  mostrarComentariosHijoPrincipales(indice: number) {
    this.mostrarComentarios[indice] = !this.mostrarComentarios[indice];
    console.log(this.mostrarComentarios);
    const fieldNextUrlValue = this.gameComment[indice].nextFieldValue;
    if (fieldNextUrlValue) {
      this.http.get(`http://127.0.0.1:8000${fieldNextUrlValue}`).subscribe((response: any) => {
        this.gameCommentChild[indice] = response.comments;
        this.valorNextComentarioSiguiente = response.next;
        this.gameCommentChild[indice].forEach((childComment: { profile_picture: any }) => {
          return childComment.profile_picture;
        });
        this.mostrarComentarios2[indice] = !!this.valorNextComentarioSiguiente;
      });
    }
  }
  sacarComentariosApi(indice:number, fieldNextUrlValue:string){
    console.log(fieldNextUrlValue);
    this.http.get(`http://127.0.0.1:8000${fieldNextUrlValue}`).subscribe((response: any) => {
      this.gameCommentChild[indice] = this.gameCommentChild[indice].concat(response.comments);
      this.valorNextComentarioSiguiente = response.next;
      this.gameCommentChild[indice].forEach((childComment: { profile_picture: any }) => {
        return childComment.profile_picture;
      });
      this.mostrarComentarios2[indice] = !!this.valorNextComentarioSiguiente;
      console.log(this.mostrarComentarios2[indice]);
    });
  }
  mostrarMasComentarios(indice: number) {
    const fieldNextUrlValue = this.valorNextComentarioSiguiente;
    console.log(fieldNextUrlValue);
    if (fieldNextUrlValue) {
      this.sacarComentariosApi(indice, fieldNextUrlValue);
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
    localStorage.setItem("perfilUsuarioExterno", usuario);
    this.routerNavigate.navigate(['/viewProfile/',usuario]);
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
