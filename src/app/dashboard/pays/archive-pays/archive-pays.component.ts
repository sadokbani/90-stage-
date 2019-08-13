import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog, } from '@angular/material';
import {PaysService} from '../service/pays.service';
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
  selector: 'app-archive-pays',
  templateUrl: './archive-pays.component.html',
  styleUrls: ['./archive-pays.component.scss']
})
export class ArchivePaysComponent implements OnInit {

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
    this.paysService.getPaysarchive().subscribe(
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
      title: 'vous voulez vraiment supprimer ce pays ?',
      text: '',
      type: 'error',
      showCancelButton: true,
      confirmButtonColor: '#64638f',
      cancelButtonText: 'annuler',
      confirmButtonText: 'oui'
    }).then((result) => {
      if (result.value){
        this.paysService.delete(id).subscribe(
          data => {
            console.log(data);
            swal.fire({
              type: 'success',
              title: 'ce pays a été supprimé',
              showConfirmButton: false,
              timer: 1500
            });
            this.refrechPays();
            if (this.dataSource.data.length-1 == 0 ) this.router.navigate(['admin/pays']);
          }
        ) ; }
    }) ;
  }
  openDialog2(id): void {
    swal.fire({
      title: 'vous voulez vraiment restaurer ce pays ?',
      text: '',
      type: 'info',
      showCancelButton: true,
      confirmButtonColor: '#64638f',
      cancelButtonText: 'annuler',
      confirmButtonText: 'oui'
    }).then((result) => {
      if (result.value){
        this.paysService.restaurerPays(id).subscribe(
          data => {
            console.log(data);
            swal.fire({
              type: 'success',
              title: 'ce pays a été restauré',
              showConfirmButton: false,
              timer: 1500
            });
            this.refrechPays();
            if (this.dataSource.data.length-1 == 0 ) this.router.navigate(['admin/pays']);

          }
        ) ; }
    }) ;
  }
}
