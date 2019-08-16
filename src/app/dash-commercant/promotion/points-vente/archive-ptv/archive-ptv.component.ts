import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog, } from '@angular/material';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {MatPaginatorIntl} from '@angular/material';
import swal from 'sweetalert2';
import {PtvService} from '../ptv.service';


export class Ptv {
    constructor (
        public id: string,
        public Nom: string,
        public Priority: number,
        public ID_commercant: number, ) {}

}

@Component({
  selector: 'app-archive-ptv',
  templateUrl: './archive-ptv.component.html',
  styleUrls: ['./archive-ptv.component.scss']
})
export class ArchivePtvComponent implements OnInit {
    displayedColumns: string[] = [ 'Adresse', 'priority', 'action'];
    dataSource = new MatTableDataSource<Ptv>();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private  ptv: PtvService, private router: Router , public dialog: MatDialog ) {
    }
    ngOnInit() {
        this.paginator._intl.itemsPerPageLabel = 'nombre des points de vente à afficher par page';
        this.paginator._intl.nextPageLabel = 'page suivante';
        this.paginator._intl.previousPageLabel = 'page précédente ' ;
        this.paginator._intl.lastPageLabel = 'dernière page';
        this.paginator._intl.firstPageLabel = 'première page' ;
        this.paginator.showFirstLastButtons = true;



        this.refrechPtv();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
    refrechPtv() {
        const id = sessionStorage.getItem('commercantId');
        console.log(id);
        this.ptv.getPtvarchive(id).subscribe(
            response => {
                this.dataSource.data = response as Ptv[];
                console.log(response);
            }
        );
    }



    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

}
