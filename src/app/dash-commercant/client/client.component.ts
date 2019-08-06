import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource, MatPaginator, MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Router} from '@angular/router';
import swal from "sweetalert2";
import {ClientService} from './service/client.service';

class ID {
  id: string;
}

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  value = '';
  deletev = false;
  displayedColumns: string[] = ['imagePath', 'nom', 'email', 'nombreJeton', 'role', 'dateCreation', 'actions'];
  dataSource = new MatTableDataSource<any>();
  name: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  Table: ID[] = [];
  constructor(private router: Router,
              private userService: ClientService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.paginator._intl.itemsPerPageLabel = 'nombre des clients à afficher par page';
    this.paginator._intl.nextPageLabel = 'page suivante';
    this.paginator._intl.previousPageLabel = 'page précédente ' ;
    this.paginator._intl.lastPageLabel = 'dernière page';
    this.paginator._intl.firstPageLabel = 'première page' ;
    this.refrechUsers();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.userService.retriveAllID().subscribe(
      response => {
        this.Table = response.id as any[];
        console.log(this.Table);
      }
    );
  }


  refrechUsers() {
    const array = this.Table;
    for (let i = 0; i < array.length; i++) {
      console.log(array[i]);
      this.userService.retriveAllUsersbyID('array[i]').subscribe(
        response => {
          this.dataSource.data = response.users as any[];
        }
      );
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(id): void {
    swal.fire({
      title: 'vous voulez vraiment archiver ce client ?',
      text: '',
      type: 'error',
      showCancelButton: true,
      confirmButtonColor: '#64638f',
      cancelButtonColor: '#9795cf',
      cancelButtonText: 'annuler',
      confirmButtonText: 'oui'
    }).then((result) => {
      if (result.value) {
        this.userService.archiveUser(id).subscribe(
          data => {
            console.log(data);
            swal.fire({
              type: 'success',
              title: 'ce client a été archivé',
              showConfirmButton: false,
              timer: 1500
            });
            this.refrechUsers();
          }
        );
      }
    });

  }


}
