import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Commercant} from '../../../session/commercant.model';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private router: Router) { }

  retriveAllUsers(){
    return this.http.get<{message:string, users:any}>("http://localhost:3000/user/valide/tous");
  }

  retriveAllUsersNV(){
    return this.http.get<{message:string, users:any}>("http://localhost:3000/user/archive/tous");
  }

  retriveAllClient(){
    return this.http.get<{message:string, users:any}>("http://localhost:3000/user/valide/client");
  }

  retriveAllClientNV(){
    return this.http.get<{message:string, users:any}>("http://localhost:3000/user/archive/client");
  }

  retriveAllCommercant(){
    return this.http.get<{message:string, users:any}>("http://localhost:3000/user/valide/commercant");
  }

  retriveAllCommercantNV(){
    return this.http.get<{message:string, users:any}>("http://localhost:3000/user/archive/commercant");
  }


  retriveUser(id){
    return this.http.get<{nom:string,prenom:string,password:string,imagePath:string,email:string}>(`http://localhost:3000/user/${id}`);
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

  addCommercant(nom:string, email:string, password:string, image:File){
    const commercantData = new FormData();
    commercantData.append('nom', nom);
    commercantData.append('email', email);
    commercantData.append('password', password);
    commercantData.append('image', image, nom);
    this.http.post<{ message: string; user: any }>("http://localhost:3000/user/1",
      commercantData).subscribe(
      responseData =>{
        console.log(responseData);
        this.router.navigate(['/users']);
      }
    );
  }

  addClient(nom:string, prenom:string, email:string, password:string, image:File){
    const clientData = new FormData();
    clientData.append('nom', nom);
    clientData.append('prenom', prenom);
    clientData.append('email', email);
    clientData.append('password', password);
    clientData.append('image', image, nom);
    this.http.post<{ message: string; user: any }>("http://localhost:3000/user/2",
      clientData).subscribe(
      responseData =>{
        console.log(responseData);
        this.router.navigate(['/users']);
      }
    );
  }


  updateClientImage(id,nom:string, prenom:string, email:string, password:string, image:File){
    const clientData = new FormData();
    clientData.append('nom', nom);
    clientData.append('prenom', prenom);
    clientData.append('email', email);
    clientData.append('password', password);
    clientData.append('image', image, nom);
    this.http.put(`http://localhost:3000/user/image/${id}`,
      clientData).subscribe(
      responseData =>{
        console.log(responseData);
        this.router.navigate(['/users']);
      }
    );
  }

  updateClient(id,nom:string, prenom:string, email:string, password:string){
    this.http.put(`http://localhost:3000/user/${id}`,
      {
        nom:nom,
        prenom: prenom,
        email: email,
        password:password
      }).subscribe(
      responseData =>{
        console.log(responseData);
        this.router.navigate(['/users']);
      }
    );
  }

  updateCommercantImage(id,nom:string, email:string, password:string, image:File){
    const clientData = new FormData();
    clientData.append('nom', nom);
    clientData.append('email', email);
    clientData.append('password', password);
    clientData.append('image', image, nom);
    this.http.put(`http://localhost:3000/user/image/${id}`,
      clientData).subscribe(
      responseData =>{
        console.log(responseData);
        this.router.navigate(['/users']);
      }
    );
  }

  updateCommercant(id,nom:string, email:string, password:string){
    this.http.put(`http://localhost:3000/user/${id}`,
      {
        nom:nom,
        email: email,
        password:password
      }).subscribe(
      responseData =>{
        console.log(responseData);
        this.router.navigate(['/users']);
      }
    );
  }
}
