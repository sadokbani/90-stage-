import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import swal from 'sweetalert2' ;
import {MatPaginator, } from '@angular/material/paginator';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {CategorieService} from './service/categorie.service';
import {Router} from '@angular/router';




export class Categories {
  constructor (
    public  id: string,
    public  name: string,
    public  description: string,
    public  priority: number, ) {}
}
@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.scss']
})


export class CategorieComponent implements OnInit {
  public data: any ;
  displayedColumns: string[] = [ 'name', 'description', 'priority', 'image', 'action'];
  dataSource = new MatTableDataSource<Categories>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private  categorieService: CategorieService, private router: Router, public dialog: MatDialog ) {
  }
  ngOnInit() {
    this.paginator._intl.itemsPerPageLabel = 'nombre des catégorie à afficher par page';
    this.paginator._intl.nextPageLabel = 'page suivante';
    this.paginator._intl.previousPageLabel = 'page précédente ' ;
    this.paginator._intl.lastPageLabel = 'dernière page';
    this.paginator._intl.firstPageLabel = 'première page' ;
    this.refrechCategories();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  refrechCategories() {
    this.categorieService.getCategorie().subscribe(
      response => {
        this.dataSource.data = response as Categories[];

      }
    );
  }



  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  openDialog(id): void {
    swal.fire({
      title: 'vous voulez vraiment archiver cette catégorie ?',
      text: "",
      type: 'danger',
      showCancelButton: true,
      confirmButtonColor: '#64638f',
      cancelButtonColor: '#9795cf',
      cancelButtonText: 'annuler',
      confirmButtonText: 'oui'
    }).then((result) => {
      if (result.value){
      this.categorieService.archiverCategorie(id).subscribe(
        data => {
          console.log(data);
          swal.fire({
            type: 'success',
            title: 'cette categorie a été archivé',
            showConfirmButton: false,
            timer: 1500
          })
          this.refrechCategories();
        }
      ) ; }
    }) ;
  }
}
//
// @Component({
//   selector: 'app-alertcategorie',
//   templateUrl: 'alert_categorie.html',
// })
// export class alert_categorie {
//
//   constructor(private categorieService: CategorieService,
//               public dialogRef: MatDialogRef<alert_categorie>,
//               @Inject(MAT_DIALOG_DATA) public data: any) {}
//
//   onNoClick(): void {
//     this.dialogRef.close();
//   }
//
//   archive() {
//     this.categorieService.archiverCategorie(this.data.id).subscribe(
//       data =>{
//         console.log(data);
//         this.dialogRef.close();
//       }
//     );
//   }
// }
