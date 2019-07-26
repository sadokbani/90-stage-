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
      title: 'voulez-vous vraiment supprimer cette catégorie',
      text: "",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'annuler',
      confirmButtonText: 'oui'
    }).then((result) => {
      if (result.value){
        this.categorieService.delete(id).subscribe(
          data => {
            console.log(data);
            swal.fire(
              'cette categorie a été supprimer',
              '',
              'success'
            )
            this.refrechCategories();
          }
        ) ; }
    }) ;
  }
  openDialog_rest(id): void {
    swal.fire({
      title: 'voulez-vous vraiment restaurer cette  catégorie',
      text: "",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'annuler',
      confirmButtonText: 'oui'
    }).then((result) => {
      if (result.value){
        this.categorieService.restaurerCategorie(id).subscribe(
          data => {
            console.log(data);
            swal.fire(
              'cette  categorie a été restauré',
              '',
              'success'
            )
            this.refrechCategories();
          }
        ) ; }
    }) ;
  }
}


