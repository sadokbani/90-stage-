import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';
import {ClientService, UserService} from '../service/client.service' ;
import swal from "sweetalert2";

@Component({
  selector: 'app-archive-clients',
  templateUrl: './archive-clients.component.html',
  styleUrls: ['./archive-clients.component.scss']
})
export class ArchiveClientsComponent implements OnInit {
  value = '';
  deletev = false;
  selected = '1';

  displayedColumns: string[] = ['imagePath', 'nom', 'email', 'nombreJeton', 'role', 'dateCreation', 'actions' ];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router,
              private userService: ClientService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.paginator._intl.itemsPerPageLabel = 'nombre des achats à afficher par page';
    this.paginator._intl.nextPageLabel = 'page suivante';
    this.paginator._intl.previousPageLabel = 'page précédente ' ;
    this.paginator._intl.lastPageLabel = 'dernière page';
    this.paginator._intl.firstPageLabel = 'première page' ;

    this.refrechUsers();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  refrechUsers() {
    this.userService.retriveAllUsersArchive().subscribe(
      response => {
        console.log(response.users);
        this.dataSource.data = response.users as any[];

      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  delete(id): void {
    swal.fire({
      title: 'vous voulez vraiment supprimer ce client ?',
      type: 'error',
      showCancelButton: true,
      confirmButtonColor: '#64638f',
      cancelButtonColor: '#9795cf',
      cancelButtonText: 'annuler',
      confirmButtonText: 'oui'
    }).then((result) => {
      if (result.value){
        this.userService.deleteUser(id).subscribe(
          data => {
            console.log(data);
            swal.fire({
              type: 'success',
              title: 'ce client a été supprimé',
              showConfirmButton: false,
              timer: 1500
            });
            this.refrechUsers();
            if (this.dataSource.data.length-1 == 0 ) {this.router.navigate(['commer/client']) };

          }
        ) ; }
    }) ;
  }
  restaurer(id): void {
    swal.fire({
      title: 'vous voulez vraiment restaurer ce client ?',
      text: '',
      type: 'info',
      showCancelButton: true,
      confirmButtonColor: '#64638f',
      cancelButtonColor: '#9795cf',
      cancelButtonText: 'annuler',
      confirmButtonText: 'oui'
    }).then((result) => {
      if (result.value) {
        this.userService.restaurerUser(id).subscribe(
          data => {
            console.log(data);
            swal.fire({
              type: 'success',
              title: 'ce client a été restauré',
              showConfirmButton: false,
              timer: 1500
            });
            this.refrechUsers();
            if (this.dataSource.data.length-1 == 0 ) {this.router.navigate(['commer/client']); }

          }
        ) ; }
    }) ;


  }

}
