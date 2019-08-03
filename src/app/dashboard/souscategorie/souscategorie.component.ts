import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog,} from '@angular/material';
import {SouscategorieService} from './service/souscategorie.service';
import {Router} from '@angular/router';
import {CategorieService} from '../categorie/service/categorie.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import swal from "sweetalert2";


export class Categories {
  constructor (
    public  id: string,
    public  name: string,
    public categoriename: string,
    public  priority: number, ) {}
}

class Categorie {
  _id: string;
  CategorieNom: string;
  CategorieDescription: string;
  CategoriePriority: number;
  CategorieImage: string;
}

@Component({
  selector: 'app-souscategorie',
  templateUrl: './souscategorie.component.html',
  styleUrls: ['./souscategorie.component.scss']
})
export class SouscategorieComponent implements OnInit {
  categories: Categorie[];
  selected = '1';
  displayedColumns: string[] = [ 'name', 'categoriename', 'priority', 'action'];
  dataSource = new MatTableDataSource<Categories>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private  categorieService: SouscategorieService, private router: Router ,  private  ps2: CategorieService , public dialog: MatDialog ) {
  }
  ngOnInit() {
    this.ps2.getCategorie().subscribe((data: Categorie[]) => {
      this.categories = data;
    });
    this.paginator._intl.itemsPerPageLabel = 'nombre des sous catégorie à afficher par page';
    this.paginator._intl.nextPageLabel = 'page suivante';
    this.paginator._intl.previousPageLabel = 'page précédente ' ;
    this.paginator._intl.lastPageLabel = 'dernière page';
    this.paginator._intl.firstPageLabel = 'première page' ;
    this.refrechCategories();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  refrechCategories() {
    this.categorieService.getSousCategorie().subscribe(
      response => {
        this.dataSource.data = response as Categories[];

      }
    );
  }

  refrechSouscategorie_byCategorie() {
    this.categorieService.getSousCategorie_byCategorie(this.selected).subscribe(
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
      title: 'vous voulez vraiment archiver cette sous catégorie ?',
      text: "",
      type: 'error',
      showCancelButton: true,
      confirmButtonColor: '#64638f',
      cancelButtonColor: '#9795cf',
      cancelButtonText: 'annuler',
      confirmButtonText: 'oui'
    }).then((result) => {
      if (result.value){
        this.categorieService.archiverSousCategorie(id).subscribe(
          data => {
            console.log(data);
            swal.fire({
              type: 'success',
              title: 'cette sous categorie a été archivé',
              showConfirmButton: false,
              timer: 1500
            })
            this.refrechCategories();
          }
        ) ; }
    }) ;
  }

  select() {

    if (this.selected == '1') {this.refrechCategories(); } else {this.refrechSouscategorie_byCategorie() ;
    }
  }

}

// @Component({
//   selector: 'app-alertsouscategorie',
//   templateUrl: 'alert_sous_categorie.html',
// })
// export class alert_sous_categorie {
//
//   constructor(private categorieService: SouscategorieService,
//               public dialogRef: MatDialogRef<alert_sous_categorie>,
//               @Inject(MAT_DIALOG_DATA) public data: any) {}
//
//   onNoClick(): void {
//     this.dialogRef.close();
//   }
//
//   archiver() {
//     this.categorieService.archiverSousCategorie(this.data.id).subscribe(
//       data =>{
//         console.log(data);
//         this.dialogRef.close();
//       }
//     );
//   }
// }

