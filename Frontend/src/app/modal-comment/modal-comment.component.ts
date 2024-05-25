import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {Router} from "@angular/router";

@Component({
  selector: 'app-modal-comment',
  templateUrl: './modal-comment.component.html',
  styleUrl: './modal-comment.component.css'
})
export class ModalCommentComponent {
  constructor(public router:Router, public dialogRef: MatDialogRef<ModalCommentComponent>) {}
  closeDialog() {
    this.dialogRef.close();
  }
  goToLogin(){
    this.dialogRef.close();
    this.router.navigate(['/login']);
  }
}
