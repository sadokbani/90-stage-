import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource, MatPaginator, MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Router} from '@angular/router';
import {UserService} from './service/user.service';
import swal from "sweetalert2";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  value = '';
  deletev = false;
  displayedColumns: string[] = ['imagePath', 'nom', 'email', 'nombreJeton', 'role', 'dateCreation', 'actions'];
  dataSource = new MatTableDataSource<any>();
  selected = '1';
  name: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router,
              private userService: UserService,
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

  }

  refrechUsers() {
    this.userService.retriveAllUsers().subscribe(
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




  update(id, role) {
    if (role == 2) this.router.navigate(['/admin/client', id]);
    if (role == 1) this.router.navigate(['/admin/commercant', id]);

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


  select(){
    console.log(this.selected);
    if (this.selected =='1') this.refrechUsers();
    if (this.selected =='2') {
      this.userService.retriveAllClient().subscribe(
        response=>{
          this.dataSource.data = response.users as any[];
        }
      );
    }
    if (this.selected =='3') {
      this.userService.retriveAllCommercant().subscribe(
        response=>{
          this.dataSource.data = response.users as any[];
        }
      );
    }

  }
}

//
// @Component({
//   selector: 'user-alert',
//   templateUrl: 'userAlert.html',
// })
// export class UserAlert {
//
//   constructor(private userService: UserService,
//     public dialogRef: MatDialogRef<UserAlert>,
//     @Inject(MAT_DIALOG_DATA) public data: any) {}
//
//   onNoClick(): void {
//     this.dialogRef.close();
//   }
//
//   archive(){
//     // console.log(id);
//     this.userService.archiveUser(this.data.id).subscribe(
//       data =>{
//         console.log(data);
//         this.dialogRef.close();
//       }
//     );
//   }
// }
