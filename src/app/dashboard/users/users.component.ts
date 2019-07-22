import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource, MatPaginator} from '@angular/material';
import {Router} from '@angular/router';
import {UserService} from './service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  value= '';
  deletev = false;
  displayedColumns: string[] = ['imagePath', 'nom', 'email', 'nombreJeton', 'role', 'dateCreation', 'update', 'delete'];
  dataSource= new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router,
              private userService: UserService) { }

  ngOnInit() {
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

  archive(id){
    console.log(id);
    this.userService.archiveUser(id).subscribe(
      data =>{
        this.refrechUsers();
      }
    );
  }

  update(id, role){
    if(role == 2)this.router.navigate(['/client', id]);
    if(role == 1)this.router.navigate(['/commercant', id]);

  }
}
