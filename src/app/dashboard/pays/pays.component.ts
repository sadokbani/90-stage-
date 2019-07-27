import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog, } from '@angular/material';
import {PaysService} from './service/pays.service';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import swal from 'sweetalert2';


export class Pays {
  constructor (
    public  id: string,
    public  name: string,
    public  priority: number, ) {}
}

@Component({
  selector: 'app-pays',
  templateUrl: './pays.component.html',
  styleUrls: ['./pays.component.scss']
})
export class PaysComponent implements OnInit {
  displayedColumns: string[] = [ 'pays', 'priority', 'action'];
  dataSource = new MatTableDataSource<Pays>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private  paysService: PaysService, private router: Router , public dialog: MatDialog ) {
  }
  ngOnInit() {
    this.paginator._intl.itemsPerPageLabel = 'nombre des pays à afficher par page';
    this.paginator._intl.nextPageLabel = 'page suivante';
    this.paginator._intl.previousPageLabel = 'page précédente ' ;
    this.paginator._intl.lastPageLabel = 'dernière page';
    this.paginator._intl.firstPageLabel = 'première page' ;
    this.refrechPays();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  refrechPays() {
    this.paysService.getPays().subscribe(
      response => {
        this.dataSource.data = response as Pays[];

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
      title: 'voulez-vous vraiment archiver ce pays',
      text: '',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'annuler',
      confirmButtonText: 'oui'
    }).then((result) => {
      if (result.value){
        this.paysService.archiverPays(id).subscribe(
          data => {
            console.log(data);
            swal.fire(
              'ce pays a été archivé',
              '',
              'success'
            )
            this.refrechPays();
          }
        ) ; }
    }) ;
  }
}
