import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient,
              private router: Router) { }
  retriveAllUsers(){
    return this.http.get<{message:string, users:any}>("http://localhost:3000/user/valide/tous");
  }

  retriveAllUsersArchive(){
    return this.http.get<{message:string, users:any}>("http://localhost:3000/user/archive/tous");
  }

  archiveUser(id) {
    return this.http.put(`http://localhost:3000/user/archive/${id}`,null);
  }

  restaurerUser(id) {
    return this.http.put(`http://localhost:3000/user/restaurer/${id}`,null);
  }

  deleteUser(id) {
    return this.http.delete(`http://localhost:3000/user/${id}`);
  }












}
