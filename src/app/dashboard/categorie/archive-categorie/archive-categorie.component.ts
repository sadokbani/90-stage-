import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {CategorieService} from '../service/categorie.service';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { MatDialog, } from '@angular/material';
import swal from "sweetalert2";
export class Categories {
  constructor (
    public  id: string,
    public  name: string,
    public  description: string,
    public  priority: number, ) {}
}
@Component({
  selector: 'app-archive-categorie',
  templateUrl: './archive-categorie.component.html',
  styleUrls: ['./archive-categorie.component.scss']
})
export class ArchiveCategorieComponent implements OnInit {

  displayedColumns: string[] = [ 'name', 'description', 'priority', 'image', 'action'];
  dataSource = new MatTableDataSource<Categories>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private  categorieService: CategorieService, private router: Router , public dialog: MatDialog ) {
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
    this.categorieService.getCategoriearchive().subscribe(
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
      title: 'vous voulez vraiment supprimer cette catégorie',
      text: "",
      type: 'error',
      showCancelButton: true,
      confirmButtonColor: '#64638f',
      cancelButtonColor: '#9795cf',
      cancelButtonText: 'annuler',
      confirmButtonText: 'oui'
    }).then((result) => {
      if (result.value){
        this.categorieService.delete(id).subscribe(
          data => {
            console.log(data);
            swal.fire({
              type: 'success',
              title: 'cette categorie a été supprimé',
              showConfirmButton: false,
              timer: 1500
            });
            this.refrechCategories();
            console.log(this.dataSource.data.length);
            if (this.dataSource.data.length-1 == 0 ) this.router.navigate(['admin/categorie']);
          }
        ) ; }
    }) ;
  }
  openDialog_rest(id): void {
    swal.fire({
      title: 'vous voulez vraiment restaurer cette  catégorie',
      text: "",
      type: 'info',
      showCancelButton: true,
      confirmButtonColor: '#64638f',
      cancelButtonColor: '#9795cf',
      cancelButtonText: 'annuler',
      confirmButtonText: 'oui'
    }).then((result) => {
      if (result.value){
        this.categorieService.restaurerCategorie(id).subscribe(
          data => {
            console.log(data);

            swal.fire({
              type: 'success',
              title: 'cette categorie a été restauré',
              showConfirmButton: false,
              timer: 1500
            });
            this.refrechCategories();
            console.log(this.dataSource.data.length);

            if (this.dataSource.data.length-1 == 0 ) this.router.navigate(['admin/categorie']);

          }
        ) ; }
    }) ;
  }
}


