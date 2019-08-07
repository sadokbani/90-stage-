import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  promotionData:any[];
  dataSource = new MatTableDataSource<any>();

  constructor(private http: HttpClient,
              private router: Router) { }


  addPromotion(commercant:string, promotionNom:string, SousCategorieNom:any[], adresse:string, categorieNom:string, dateDebut, description:string,image:any[],time){
    const promotionData = new FormData();
    promotionData.append('commercant', commercant);
    promotionData.append('categorieNom', categorieNom);
    promotionData.append('adresse', adresse);
    promotionData.append('promotionNom', promotionNom);
    promotionData.append('description', description);
    promotionData.append('dateDebut', dateDebut);
    for (let i=0;i<image.length;i++){
      promotionData.append('image', image[i], promotionNom);
    }
    for (let i=0;i<SousCategorieNom.length;i++){
      promotionData.append('SousCategorieNom', SousCategorieNom[i]);
    }
    this.http.post("http://localhost:3000/promotion",
      promotionData).subscribe(
      (responseData:any) =>{
        console.log(responseData);
        this.http.put(`http://localhost:3000/promotion/activation/${time}/${responseData.promotion.createdPromo._id}`,null).subscribe(
          response=>{
            const id = sessionStorage.getItem('commercantId');
            console.log(id);
            this.retriveAllpromotion(id);
            this.desactivationTime(responseData.promotion.createdPromo._id).subscribe(
              data=>{
                this.retriveAllpromotion(id);
                console.log(data);
              }
            );          }
        );
        this.router.navigate(['/commer/promotion']);
      }
    );
  }


  retriveAllpromotion(nom){
    this.http.get<{message:string, promotions:any}>(`http://localhost:3000/promotion/commercant/${nom}`).subscribe(
      response => {
         console.log(response.promotions);
        // this.promotionService.promotionData = response.promotions ;
        // this.dataSource.data = this.promotionService.promotionData as any[];
        this.dataSource.data = response.promotions as any[];


      }
    );
  }

  activation(id){
    return this.http.put(`http://localhost:3000/promotion/activation/${id}`,null);
  }

  desactivation(id){
    return this.http.put(`http://localhost:3000/promotion/desactivation/${id}`,null);
  }

  desactivationTime(id){
    return this.http.put(`http://localhost:3000/promotion/desactivation/time/${id}`,null);
  }

  deletePromotion(id) {
    return this.http.delete(`http://localhost:3000/promotion/${id}`);
  }

  retrivePromotin(id){
    return this.http.get<any>(`http://localhost:3000/promotion/${id}`);
  }

  updatePromotion(id,commercant:string, promotionNom:string, SousCategorieNom:any[], adresse:string, categorieNom:string, dateDebut, description:string,image:any[]){
    const date= new Date(dateDebut);
    const dateNow= new Date();
    const periode=date.getTime()-dateNow.getTime();
    const promotionData = new FormData();
    promotionData.append('commercant', commercant);
    promotionData.append('categorieNom', categorieNom);
    promotionData.append('adresse', adresse);
    promotionData.append('promotionNom', promotionNom);
    promotionData.append('description', description);
    promotionData.append('dateDebut', dateDebut);

    for (let i=0;i<SousCategorieNom.length;i++){
      promotionData.append('SousCategorieNom', SousCategorieNom[i]);
    }

    if (image.length == 0){
      this.http.put(`http://localhost:3000/promotion/${id}`,
        {
          commercant:commercant, promotionNom:promotionNom, SousCategorieNom:SousCategorieNom, adresse:adresse, categorieNom:categorieNom, dateDebut:dateDebut, description:description
        }).subscribe(
        responseData =>{
          console.log(responseData);
          this.router.navigate(['/admin/promotions']);
          if (periode > 0){
            this.http.put(`http://localhost:3000/promotion/activation/${periode}/${id}`,null).subscribe(
              response=>{
                const nom = sessionStorage.getItem('commercantNom');
                console.log(nom);
                this.retriveAllpromotion(nom);
                this.desactivationTime(id).subscribe(
                  data=>{
                    this.retriveAllpromotion(nom);
                    console.log(data);
                  }
                );          }
            );
          }
          this.router.navigate(['/commer/promotion']);

        }
      );
    } else {
      for (let i=0;i<image.length;i++){
        promotionData.append('image', image[i], promotionNom);
      }
      this.http.put(`http://localhost:3000/promotion/image/${id}`,
        promotionData).subscribe(
        responseData =>{
          console.log(responseData);
          if (periode > 0){
            this.http.put(`http://localhost:3000/promotion/activation/${periode}/${id}`,null).subscribe(
              response=>{
                const id = sessionStorage.getItem('commercantId');
                console.log(id);
                this.retriveAllpromotion(id);
                this.desactivationTime(id).subscribe(
                  data=>{
                    this.retriveAllpromotion(id);
                    console.log(data);
                  }
                );          }
            );
          }
          this.router.navigate(['/commer/promotion']);
        }
      );
    }

  }


}
