import {AfterViewChecked, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';
import {UserService} from '../users/service/user.service';
import swal from "sweetalert2";
import {PromotionService} from './service/promotion.service';
import {CategorieService} from '../categorie/service/categorie.service';
import {SouscategorieService} from '../souscategorie/service/souscategorie.service';


@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss']
})
export class PromotionsComponent implements OnInit {
  selectedCommer='1';
  selectedCategorie='1';
  value = '';
  deletev = false;
  displayedColumns: string[] = ['commercant', 'categorieNom', 'SousCategorieNom', 'promotionNom', 'adresse','description','quantite','statut', 'image','actions'];
  selected = '1';
  name: string;
  commercants:any[];
  categories:any[];
  sousCategorieSelected ;
  sousCategories:any[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router,
              public promotionService: PromotionService,
              public dialog: MatDialog,
              private userService : UserService,
              private categorieService: CategorieService,
              private sousCatService: SouscategorieService,

  ) {
  }

  // ngAfterViewChecked() {
  //   this.refrechPromotions();
  // }

  ngOnInit() {
    this.userService.retriveAllCommercant().subscribe(
      data=>{
        this.commercants= data.users;
      }
    );
    this.categorieService.getCategorie().subscribe(
        (data: any[])  =>{
          this.categories = data;
        });
    this.paginator._intl.itemsPerPageLabel = 'nombre des clients à afficher par page';
    this.paginator._intl.nextPageLabel = 'page suivante';
    this.paginator._intl.previousPageLabel = 'page précédente ' ;
    this.paginator._intl.lastPageLabel = 'dernière page';
    this.paginator._intl.firstPageLabel = 'première page' ;
    this.refrechPromotions();
    this.promotionService.dataSource.paginator = this.paginator;
    this.promotionService.dataSource.sort = this.sort;

  }

  refrechPromotions() {
    this.promotionService.retriveAllpromotion();
  }

  applyFilter(filterValue: string) {
    this.promotionService.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.promotionService.dataSource.paginator) {
      this.promotionService.dataSource.paginator.firstPage();
    }
  }


  active(id){
    this.promotionService.activation(id).subscribe(
      (data:any)=>{
        console.log(data._id);
        this.refrechPromotions();
        this.promotionService.desactivationTime(id).subscribe(
          response=>{

            this.refrechPromotions();
          }
        );
      }
    );
  }

  desactive(id){
      this.promotionService.desactivation(id).subscribe(
        data=>{
          console.log(data);
          this.refrechPromotions();

        }
      );
  }

  refrechSouscategorie_byCategorie() {
    this.sousCatService.getSousCategorie_byCategorie(this.selectedCategorie).subscribe(
        (response: any[]) => {
          this.sousCategories = response;
          console.log(response);
        }
    );
  }
  supprimer(id): void {
    swal.fire({
      title: 'vous voulez vraiment supprimer cette promotion ?',
      text: "",
      type: 'error',
      showCancelButton: true,
      confirmButtonColor: '#64638f',

      cancelButtonText: 'annuler',
      confirmButtonText: 'oui'
    }).then((result) => {
      if (result.value){
        this.promotionService.deletePromotion(id).subscribe(
          data => {
            console.log(data);
            swal.fire({
              type: 'success',
              title: 'cette promotion a été supprimé',
              showConfirmButton: false,
              timer: 1500
            });
              this.refrechPromotions();          }
        ) ; }
    }) ;
  }

  selectCommer(){
    if (this.selectedCommer == '1' ){
      if (this.selectedCategorie =='1'){
        this.refrechPromotions();}
      else {
        this.promotionService.retrivePromotionsByCategorie(this.selectedCategorie);
      }
    }else {
      this.promotionService.retrivePromotionsByCommercant(this.selectedCommer);
    }
  }

  selectCategorie(){
    this.refrechSouscategorie_byCategorie();
    if (this.selectedCommer == '1'){
      if (this.selectedCategorie =='1'){
        this.refrechPromotions();

      } else {
        this.promotionService.retrivePromotionsByCategorie(this.selectedCategorie);

      }
    } else {
      if (this.selectedCategorie =='1'){
        this.promotionService.retrivePromotionsByCommercant(this.selectedCommer);

      } else {
      this.promotionService.retrivePromotionsByCategorieAndCommercant(this.selectedCommer,this.selectedCategorie);
    }}
  }

  selectSousCat(){
    if (this.selectedCommer == '1'){
      if (this.sousCategorieSelected == '1'){
        this.promotionService.retrivePromotionsByCategorie(this.selectedCategorie);
      } else {
        this.promotionService.retrivePromotionsByCategorieAndSouscateg(this.sousCategorieSelected,this.selectedCategorie);
      }
    }
    else
      {
        if (this.sousCategorieSelected == '1'){
          this.promotionService.retrivePromotionsByCategorieAndCommercant(this.selectedCommer,this.selectedCategorie);

        }
        else {
          this.promotionService.retrivePromotionsByCategorieAndCommercantAndSouscat(this.selectedCommer,this.selectedCategorie,this.sousCategorieSelected);

        }
    }
  }
  openDialog(image:[string]): void {
    const dialogRef = this.dialog.open(PromoptionImage, {
      // width: (image.length*210).toString()+'px' ,
      minWidth:'150px',
      maxWidth:'80%',
      maxHeight:'70%',
      minHeight:'150px',
      data: image
    });


  }
}


@Component({
  selector: 'promoptionImage',
  templateUrl: 'promotionImage.html',
})


export class PromoptionImage  implements OnInit {

  constructor(
      public dialogRef: MatDialogRef<PromoptionImage>,
      @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    console.log(this.data)
  }
    onNoClick(): void {
    this.dialogRef.close();
  }

}
