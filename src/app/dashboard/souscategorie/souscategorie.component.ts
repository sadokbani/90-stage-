import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog,} from '@angular/material';
import {SouscategorieService} from './service/souscategorie.service';
import {Router} from '@angular/router';
import {CategorieService} from '../categorie/service/categorie.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';


export class Categories {
  constructor (
    public  id: string,
    public  name: string,
    public categoriename: string,
    public  priority: number, ) {}
}

@Component({
  selector: 'app-souscategorie',
  templateUrl: './souscategorie.component.html',
  styleUrls: ['./souscategorie.component.scss']
})
export class SouscategorieComponent implements OnInit {

  displayedColumns: string[] = [ 'name', 'categoriename', 'priority', 'action'];
  dataSource = new MatTableDataSource<Categories>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private  categorieService: SouscategorieService, private router: Router , public dialog: MatDialog ) {
  }
  ngOnInit() {
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



  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openDialog(id): void {
    const dialogRef = this.dialog.open(alert_sous_categorie, {

      data: {id: id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.refrechCategories();
    });
  }
}

@Component({
  selector: 'app-alertsouscategorie',
  templateUrl: 'alert_sous_categorie.html',
})
export class alert_sous_categorie {

  constructor(private categorieService: SouscategorieService,
              public dialogRef: MatDialogRef<alert_sous_categorie>,
              @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  archiver() {
    this.categorieService.archiverSousCategorie(this.data.id).subscribe(
      data =>{
        console.log(data);
        this.dialogRef.close();
      }
    );
  }
}

