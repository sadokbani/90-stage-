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
    return this.http.get<{message:string, users:any}>("http://localhost:8000/client_commercant/valide/client");
  }
  retriveAllUsersbyID(id){
    return this.http.get<{message:string, users:any}>(`http://localhost:8000/client_commercant/valide/client/${id}`);
  }
  retriveAllID(id){
    return this.http.get<{message:string, id:any}>(`http://localhost:8000/client_commercant/ID/${id}`);
  }
  retriveAllUsersArchive(){
    return this.http.get<{message:string, users:any}>("http://localhost:8000/client_commercant/archive/client");
  }

  archiveUser(id) {
    return this.http.put(`http://localhost:8000/client_commercant/archive/${id}`,null);
  }

  restaurerUser(id) {
    return this.http.put(`http://localhost:8000/client_commercant/restaurer/${id}`,null);
  }

  deleteUser(id) {
    return this.http.delete(`http://localhost:8000/client_commercant/${id}`);
  }












}
