import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog, } from '@angular/material';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {MatPaginatorIntl} from '@angular/material';
import swal from 'sweetalert2';
import {PtvService} from './ptv.service';
import {PaysService} from '../../../dashboard/pays/service/pays.service';
import {Pays} from '../../../dashboard/pays/pays.component';

export class Ptv {
    constructor (
        public id: string,
        public Nom: string,
        public Priority: number,
        public ID_commercant: number, ) {}

}
@Component({
  selector: 'app-points-vente',
  templateUrl: './points-vente.component.html',
  styleUrls: ['./points-vente.component.scss']
})
export class PointsVenteComponent implements OnInit {
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
        this.ptv.getPtv(id).subscribe(
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
    openDialog(id): void {
        swal.fire({
            title: 'vous voulez vraiment archiver cette adresse ?',
            text: '',
            type: 'error',
            showCancelButton: true,
            confirmButtonColor: '#64638f',
            cancelButtonText: 'annuler',
            confirmButtonText: 'oui'
        }).then((result) => {
            if (result.value) {
                this.ptv.archiverPtv(id).subscribe(
                    data => {
                        console.log(data);
                        swal.fire({
                            type: 'success',
                            title: 'ce pays a été archivé',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        this.refrechPtv();
                    }
                ) ; }
        }) ;
    }
}
