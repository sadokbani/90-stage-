import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import {SouscategorieService} from '../service/souscategorie.service';
import {Router} from '@angular/router';


export class Categories {
  constructor (
    public  id: string,
    public  name: string,
    public categoriename: string,
    public  priority: number, ) {}
}

@Component({
  selector: 'app-archive-souscategorie',
  templateUrl: './archive-souscategorie.component.html',
  styleUrls: ['./archive-souscategorie.component.scss']
})
export class ArchiveSouscategorieComponent implements OnInit {
  displayedColumns: string[] = [ 'name', 'categoriename', 'priority', 'action'];
  dataSource = new MatTableDataSource<Categories>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private  categorieService: SouscategorieService, private router: Router ) {
  }
  ngOnInit() {
    this.refrechCategories();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  refrechCategories() {
    this.categorieService.getSousCategoriearchive().subscribe(
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

  restaurer(id) {
    this.categorieService.restaurerSousCategorie(id).subscribe(
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
