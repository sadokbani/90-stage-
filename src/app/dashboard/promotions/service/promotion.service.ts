import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

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
        this.http.put(`http://localhost:3000/promotion/validation/${time}/${responseData.promotion.createdPromo._id}`,null).subscribe();
        this.router.navigate(['/admin/promotions']);
      }
    );
  }
}
