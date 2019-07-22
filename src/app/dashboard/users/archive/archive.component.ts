import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
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
              private userService: UserService) { }

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

  delete(id){
    this.userService.deleteUser(id).subscribe(
      data =>{
        this.refrechUsers();
      }
    );
  }

  restaurer(id){
    this.userService.restaurerUser(id).subscribe(
      data =>{
        this.refrechUsers();
      }
    );
  }

}
