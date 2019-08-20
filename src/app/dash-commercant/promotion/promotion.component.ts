import {AfterViewChecked, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';
import {UserService} from '../../dashboard/users/service/user.service';
import swal from "sweetalert2";
import {ServiceService} from './service/service.service';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.scss']
})
export class PromotionComponent implements OnInit {
  value = '';
  deletev = false;
  displayedColumns: string[] = ['commercant', 'categorieNom', 'SousCategorieNom', 'promotionNom', 'adresse','quantite','statut','description', 'image','actions'];
  selected = '1';
  name: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router,
              public promotionService: ServiceService,
              public dialog: MatDialog) {
  }

  // ngAfterViewChecked() {
  //   this.refrechPromotions();
  // }

  ngOnInit() {
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
    const nom = sessionStorage.getItem('commercantNom');
    console.log(nom);
    this.promotionService.retriveAllpromotion(nom);
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


  supprimer(id): void {
    swal.fire({
      title: 'vous voulez vraiment supprimer cette promotion ?',
      text: "",
      type: 'error',
      showCancelButton: true,
      confirmButtonColor: '#64638f',
      cancelButtonColor: '#9795cf',
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
