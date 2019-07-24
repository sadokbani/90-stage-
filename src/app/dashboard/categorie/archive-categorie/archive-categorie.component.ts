import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {CategorieService} from '../service/categorie.service';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { MatDialog,} from '@angular/material';
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
  openDialog(id): void {
    const dialogRef = this.dialog.open(alert_supp_categorie, {

      data: {id: id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.refrechCategories();
    });
  }
}

@Component({
  selector: 'app-alert_archive_categorie',
  templateUrl: 'alert_archive_categorie.html',
})
export class alert_supp_categorie {

  constructor(private categorieService: CategorieService,
              public dialogRef: MatDialogRef<alert_supp_categorie>,
              @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  delete() {
    this.categorieService.delete(this.data.id).subscribe(
      data =>{
        console.log(data);
        this.dialogRef.close();
      }
    );
  }
}


