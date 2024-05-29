import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(private httpClient: HttpClient) { }

  insertCommentFather( commentValue:string, intGame:number): Observable<Object> {
    const token = localStorage.getItem("tokenUser")
    const username = localStorage.getItem("username")
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': token };
    const body = new HttpParams()
      .set('username', username)
      .set('content_comment', commentValue);
    return this.httpClient.post(`http://127.0.0.1:8000/insert_comment/${intGame}/`, body.toString(), { headers });
  }
}
