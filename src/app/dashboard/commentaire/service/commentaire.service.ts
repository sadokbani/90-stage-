import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommentaireService {

  constructor(private http: HttpClient,
              private router: Router) { }

  retriveAllCommentsAc(){
    return this.http.get<{message:string, commentaires:any}>("http://localhost:8000/commentaire/active");
  }

  retriveAllCommentsDes(){
    return this.http.get<{message:string, commentaires:any}>("http://localhost:8000/commentaire/desac");
  }

  desactiverComments(id) {
    return this.http.put(`http://localhost:8000/commentaire/desactiver/${id}`,null);
  }

  activerComments(id) {
    return this.http.put(`http://localhost:8000/commentaire/activer/${id}`,null);
  }

  deleteComment(id) {
    return this.http.delete(`http://localhost:8000/commentaire/${id}`);
  }

  addComment(com){
    return this.http.post("http://localhost:8000/commentaire",com);
  }

}
