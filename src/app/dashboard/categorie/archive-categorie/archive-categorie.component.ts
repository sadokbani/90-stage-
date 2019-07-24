import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {CategorieService} from '../service/categorie.service';
import {Router} from '@angular/router';

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

  constructor(private  categorieService: CategorieService, private router: Router ) {
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
  delete(id) {
    this.categorieService.delete(id).subscribe(res => {
      this.refrechCategories();
    });
  }
  restaurer(id){
    this.categorieService.restaurerCategorie(id).subscribe(
      data => {
        this.refrechCategories();
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}



