import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {JuegosService} from "../servicios/juegos.service";
import {Subscription} from "rxjs";
import {Juego, JuegoPrueba} from "../interfaces/juego";
import {HttpClient} from "@angular/common/http";
import {ValidService} from "../servicios/validate.service";
import {NgForm} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {ModalCommentComponent} from "../modal-comment/modal-comment.component";


@Component({
  selector: 'app-info-game',
  templateUrl: './info-game.component.html',
  styleUrl: './info-game.component.css'
})
export class InfoGameComponent implements OnInit,OnDestroy{
  @ViewChild('formComments', { static: false }) formCommentsValue: NgForm;
  @ViewChild('formCommentsChild', { static: false }) formCommentsChildValue: NgForm;
  //para sacar todos los datos del juego habria que crear un servicio que se conectará con la base de datos
  juego:Juego={title:'',url:'',id:0}

  juegoPrueba:JuegoPrueba={
    id:0,
    title:'',
    synopsis:'',
    developer:'',
    link_download:'',
    link_trailer:'',
    releaseDate:'',
    genders:'',
    plataforms:'',
    }
  gameComment: any;
  respuestaError: boolean;
  subcripcion:Subscription;
  suscripcionPrueba: Subscription;
  suscriptionComment: Subscription;
  seeMore = false;
  seeMoreButton = "Ver más";
  seeLess = "Ver menos";
  searchDot: number;
  mostrarFormHijo = false;
  mostrarBotonesFormPadre = false;
  userCommentFather: any;

  constructor(private route: ActivatedRoute, private juegoservice:JuegosService, private routerNavigate: Router,
              private http: HttpClient, private isLoginUser: ValidService,public dialog: MatDialog) { }


  // onSubmit() {
  //   if (this.selectedFile) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       const base64Image = reader.result as string;
  //       // Aquí tienes tu imagen en base64
  //       console.log(base64Image);
  //     };
  //     reader.readAsDataURL(this.selectedFile);
  //   }
  // }
  //
  // onFileChange(event: any) {
  //   this.selectedFile = event.target.files[0];
  // }

  ngOnInit(): void {
    this.respuestaError= false;
    this.subcripcion=
     this.route.params.subscribe(params => {
        this.juego = this.juegoservice.getJuegobyId(parseInt(params['id']))

       })

    this.suscripcionPrueba=
      this.route.params.subscribe(params => {
        this.http.get('http://127.0.0.1:8000/api/v1/game/'+parseInt(params['id'])+'/').subscribe(JuegoRecibido => {
          console.log(JuegoRecibido)

          if(!JuegoRecibido['error']){
            this.juegoPrueba = JuegoRecibido as JuegoPrueba;
            this.searchDot = this.juegoPrueba.synopsis.indexOf('.')
          }else{
            this.juegoPrueba = JuegoRecibido['error']['error'];
            console.log("ERRORRRR")
            console.log(this.juegoPrueba);
          }
      },error => {
        this.respuestaError= true;
        console.log(error['error']['error']);

        });
     });
    this.suscriptionComment = this.route.params.subscribe(params=>{
      const gameId = params['id'];
      // const commentId = params['id_comment'];
      this.http.get(`http://127.0.0.1:8000/comment/${gameId}/3`).subscribe((CommentValue:any)=>{
        this.gameComment = CommentValue.comments[0];
        this.userCommentFather = this.gameComment.user;
        console.log(this.gameComment);
      })
    });
  }

  aniadirComentario(){
    if (this.isLoginUser.usuarioLogeado()){
      let commentValue = this.formCommentsValue.value.commentValue;
      console.log(commentValue);
    }
    else {
       this.dialog.open(ModalCommentComponent);
    }
  }
  cancelarComentario(){
    this.mostrarFormHijo = false;
    this.mostrarBotonesFormPadre = false;
    const gameId=this.juego.id
    this.routerNavigate.navigate([`/infoGame/${gameId}`])
  }
  mostrarFormComentarioHijo(){
    this.mostrarFormHijo = true;
  }
  aniadirComentarioHijo(){
    if (this.isLoginUser.usuarioLogeado()){
      let commentValue = this.formCommentsChildValue.value.commentValueChild;
      console.log(commentValue);
    }
    else {
      this.dialog.open(ModalCommentComponent);
    }
  }

  lookFullSynopsis(){
    return this.seeMore = !this.seeMore;
  }
  isEmpty(obj: any) {
    return Object.keys(obj).length > 0;
  };

  ngOnDestroy(){
    this.subcripcion.unsubscribe();
    this.suscripcionPrueba.unsubscribe();
  }
}
