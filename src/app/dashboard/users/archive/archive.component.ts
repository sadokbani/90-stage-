import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';
import {UserService} from '../service/user.service';
import swal from "sweetalert2";

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {
  value= '';
  deletev = false;
  displayedColumns: string[] = ['imagePath', 'nom', 'email', 'nombreJeton', 'role', 'dateCreation', 'actions' ];
  dataSource= new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router,
              private userService: UserService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.refrechUsers();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  refrechUsers() {
    this.userService.retriveAllUsersNV().subscribe(
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
      title: 'voulez-vous vraiment supprimer ce client',
      text: "",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'annuler',
      confirmButtonText: 'oui'
    }).then((result) => {
      if (result.value){
        this.userService.deleteUser(id).subscribe(
          data => {
            console.log(data);
            swal.fire(
              'ce client a été supprimer',
              '',
              'success'
            )
            this.refrechUsers();
          }
        ) ; }
    }) ;
  }
  restaurer(id): void {
    swal.fire({
      title: 'voulez-vous vraiment restaurer ce client',
      text: "",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'annuler',
      confirmButtonText: 'oui'
    }).then((result) => {
      if (result.value){
        this.userService.restaurerUser(id).subscribe(
          data => {
            console.log(data);
            swal.fire(
              'ce client a été restauré',
              '',
              'success'
            )
            this.refrechUsers();
          }
        ) ; }
    }) ;
  }
}




//
// @Component({
//   selector: 'user-alert-supp',
//   templateUrl: 'userAlertSupp.html',
// })
// export class UserAlertSupp {
//
//   constructor(private userService: UserService,
//               public dialogRef: MatDialogRef<UserAlertSupp>,
//               @Inject(MAT_DIALOG_DATA) public data: any) {}
//
//   onNoClick(): void {
//     this.dialogRef.close();
//   }
//   supprimer(){
//     this.userService.deleteUser(this.data.id).subscribe(
//       data =>{
//         console.log(data);
//         this.dialogRef.close();
//       }
//     );
//   }
//
//
// }

