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


  addPromotion(commercant:string, promotionNom:string, SousCategorieNom:any[], adresse:string, PTV:any[], categorieNom:string, dateDebut, description:string,image:any[],time){
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
for (let i=0;i<PTV.length;i++){
    promotionData.append('PTV', PTV[i]);
}
    this.http.post("http://localhost:8000/promotion",
      promotionData).subscribe(
      (responseData:any) =>{
        console.log(responseData);
        this.http.put(`http://localhost:8000/promotion/activation/${time}/${responseData.promotion.createdPromo._id}`,null).subscribe(
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
     this.http.get<{message:string, promotions:any}>("http://localhost:8000/promotion").subscribe(
      response => {
        this.dataSource.data = response.promotions as any[];
      }
    );
  }

  retrivePromotionsByCommercant(nom){
       this.http.get<{message:string, promotions:any}>(`http://localhost:8000/promotion/commercant/${nom}`).subscribe(
        response => {
          this.dataSource.data = response.promotions as any[];
        }
      );
    }

  retrivePromotionsByCategorie(nom){
       this.http.get<{message:string, promotions:any}>(`http://localhost:8000/promotion/categorie/${nom}`).subscribe(
        response => {
          this.dataSource.data = response.promotions as any[];
        }
      );
    }

  retrivePromotionsByCategorieAndCommercant(commer,cat){
       this.http.get<{message:string, promotions:any}>(`http://localhost:8000/promotion/mult/${cat}/${commer}`).subscribe(
        response => {
          this.dataSource.data = response.promotions as any[];
        }
      );
    }

    retrivePromotionsByCategorieAndCommercantAndSouscat(commer,cat,souscat){
        this.http.get<{message:string, promotions:any}>(`http://localhost:8000/promotion/mult/${cat}/${commer}/${souscat}`).subscribe(
            response => {
                this.dataSource.data = response.promotions as any[];
            }
        );
    }

    retrivePromotionsByCategorieAndSouscateg(sousCat,cat){
        this.http.get<{message:string, promotions:any}>(`http://localhost:8000/promotion/multi/${cat}/${sousCat}`).subscribe(
            response => {
                this.dataSource.data = response.promotions as any[];
            }
        );
    }
  activation(id){
    return this.http.put(`http://localhost:8000/promotion/activation/${id}`,null);
  }

  desactivation(id){
    return this.http.put(`http://localhost:8000/promotion/desactivation/${id}`,null);
  }


  desactivationTime(id){
   return this.http.put(`http://localhost:8000/promotion/desactivation/time/${id}`,null);
  }

  deletePromotion(id) {
    return this.http.delete(`http://localhost:8000/promotion/${id}`);
  }

  retrivePromotin(id){
    return this.http.get<any>(`http://localhost:8000/promotion/${id}`);
  }
    getPtvbyname(nom) {
        return this
            .http
            .get(`http://localhost:8000/ptv/${nom}`);
    }
  updatePromotion(id,commercant:string, promotionNom:string, SousCategorieNom:any[], adresse:string,PTV:any[], categorieNom:string, dateDebut, description:string,image:any[],quantite:string){
    const date= new Date(dateDebut);
    const dateNow= new Date();
    const periode=date.getTime()-dateNow.getTime();
    const promotionData = new FormData();
    promotionData.append('commercant', commercant);
    promotionData.append('nombreStock', quantite);
    promotionData.append('categorieNom', categorieNom);
    promotionData.append('adresse', adresse);
    promotionData.append('promotionNom', promotionNom);
    promotionData.append('description', description);
    promotionData.append('dateDebut', dateDebut);

    for (let i=0;i<SousCategorieNom.length;i++){
      promotionData.append('SousCategorieNom', SousCategorieNom[i]);
    }
      for (let i=0;i<PTV.length;i++){
          promotionData.append('PTV', PTV[i]);
      }
    if (image.length == 0){
      this.http.put(`http://localhost:8000/promotion/${id}`,
        {
          commercant:commercant, promotionNom:promotionNom, SousCategorieNom:SousCategorieNom, adresse:adresse,  ptv:PTV, categorieNom:categorieNom, dateDebut:dateDebut, description:description
        }).subscribe(
        responseData =>{
          console.log(responseData);
          this.router.navigate(['/admin/promotions']);
          if (periode > 0){
            this.http.put(`http://localhost:8000/promotion/activation/${periode}/${id}`,null).subscribe(
              response=>{
                this.retriveAllpromotion();
                this.desactivationTime(id).subscribe(
                  data=>{
                    this.retriveAllpromotion();
                    console.log(data);
                  }
                );          }
            );
          }
          this.router.navigate(['/admin/promotions']);

        }
      );
    } else {
      for (let i=0;i<image.length;i++){
        promotionData.append('image', image[i], promotionNom);
      }
      this.http.put(`http://localhost:8000/promotion/image/${id}`,
        promotionData).subscribe(
        responseData =>{
          console.log(responseData);
          if (periode > 0){
            this.http.put(`http://localhost:8000/promotion/activation/${periode}/${id}`,null).subscribe(
              response=>{
                this.retriveAllpromotion();
                this.desactivationTime(id).subscribe(
                  data=>{
                    this.retriveAllpromotion();
                    console.log(data);
                  }
                );          }
            );
          }
          this.router.navigate(['/admin/promotions']);
        }
      );
    }

  }


}
