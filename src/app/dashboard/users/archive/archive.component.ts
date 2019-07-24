import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {
  value= '';
  deletev = false;
  displayedColumns: string[] = ['imagePath', 'nom', 'email', 'nombreJeton', 'role', 'dateCreation', 'update', 'delete'];
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
    const dialogRef = this.dialog.open(UserAlertSupp, {
      width: '22%',
      data: {id: id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.refrechUsers();
    });
  }

  restaurer(id): void {
    const dialogRef = this.dialog.open(UserAlertRest, {
      width: '22%',
      data: {id: id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.refrechUsers();
    });
  }

}



@Component({
  selector: 'user-alert-supp',
  templateUrl: 'userAlertSupp.html',
})
export class UserAlertSupp {

  constructor(private userService: UserService,
              public dialogRef: MatDialogRef<UserAlertSupp>,
              @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  supprimer(){
    this.userService.deleteUser(this.data.id).subscribe(
      data =>{
        console.log(data);
        this.dialogRef.close();
      }
    );
  }


}

@Component({
  selector: 'user-alert-rest',
  templateUrl: 'userAlertRest.html',
})
export class UserAlertRest {

  constructor(private userService: UserService,
              public dialogRef: MatDialogRef<UserAlertRest>,
              @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  restaurer(){
    this.userService.restaurerUser(this.data.id).subscribe(
      data =>{
        console.log(data);
        this.dialogRef.close();
      }
    );
  }


}
