import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  isCommercant(email,pwd) {
    return this.http.get<any>(`http://localhost:3000/user/commercant/${email}/${pwd}`);
  }

  isExist(email){
    return this.http.get<any>(`http://localhost:3000/user/commercant/${email}`);
  }

  addSocial(nom,email,image,password){
    return this.http.post("http://localhost:3000/user/social/add",{
      imagePath:image,
      email:email,
      nom:nom,
      password:password,
      role:1
    })
  }
}
