import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Commercant} from './commercant.model';
import {Route, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http: HttpClient,
              private router: Router) { }


  addCommercant(nom:string, email:string, password:string, image:File){
    const commercantData = new FormData();
    commercantData.append('nom', nom);
    commercantData.append('email', email);
    commercantData.append('password', password);
    commercantData.append('image', image, nom);
    this.http.post<{ message: string; commercant: Commercant }>("http://localhost:8000/commercant",
      commercantData).subscribe(
        responseData =>{
          console.log(responseData);
          this.router.navigate(['session/signin']);
        }
    );
  }

  loginCommercant(commercant:{email:string, password:string}){
    return this.http.post("http://localhost:8000/commercant/login",
      commercant)
  }
}
