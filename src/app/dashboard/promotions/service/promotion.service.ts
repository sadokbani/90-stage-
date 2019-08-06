import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {
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
            this.retriveAllpromotion();
            this.desactivationTime(responseData.promotion.createdPromo._id).subscribe(
              data=>{
                this.retriveAllpromotion();
                console.log(data);
              }
            );          }
        );
        this.router.navigate(['/admin/promotions']);
      }
    );
  }


  retriveAllpromotion(){
     this.http.get<{message:string, promotions:any}>("http://localhost:3000/promotion").subscribe(
      response => {
        // console.log(response.promotions);
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
}
