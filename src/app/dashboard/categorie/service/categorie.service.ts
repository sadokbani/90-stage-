import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  uri = 'http://localhost:3000/categorie';

  constructor(private http: HttpClient,
              private router: Router) { }

  addCategorie( CategorieNom, CategorieDescription, CategoriePriority , image) {
    // const obj = {
    //
    //   CategorieNom,
    //   CategorieDescription,
    //   CategoriePriority,
    //   CategorieImage
    // };
    const obj= new FormData();
    obj.append("CategorieNom",CategorieNom);
    obj.append('CategorieDescription', CategorieDescription);
    obj.append('CategoriePriority', CategoriePriority);
    obj.append('image', image, CategorieNom);

    console.log(obj);
    this.http.post(`${this.uri}/add`, obj)
      .subscribe(res => {
        console.log('Done');
        this.router.navigate(['categorie']);

      });
  }
  getCategorie() {
    return this
      .http
      .get(`${this.uri}`);
  }
  editCategorie(id) {
    return this
      .http
      .get<any>(`${this.uri}/edit/${id}`);
  }


  updateCategorieImage(CategorieNom, CategorieDescription, CategoriePriority , image:File, id){
    const clientData = new FormData();
    clientData.append('CategorieNom', CategorieNom);
    clientData.append('CategorieDescription', CategorieDescription);
    clientData.append('CategoriePriority', CategoriePriority);
    clientData.append('image', image, CategorieNom);
    this.http.put(`http://localhost:3000/categorie/image/${id}`,
      clientData).subscribe(
      responseData =>{
        console.log(responseData);
        this.router.navigate(['/categorie']);
      }
    );
  }

  updateCategorie(CategorieNom, CategorieDescription, CategoriePriority , id){

    this.http.put(`http://localhost:3000/categorie/${id}`,
      {
        CategorieNom:CategorieNom,
        CategorieDescription:CategorieDescription,
        CategoriePriority:CategoriePriority
      }).subscribe(
      responseData =>{
        console.log(responseData);
        this.router.navigate(['/categorie']);
      }
    );
  }
  delete(id) {
    return this
      .http
      .get(`${this.uri}/delete/${id}`);
  }
}
