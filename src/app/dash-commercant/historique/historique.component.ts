import {Component, Inject, OnInit, ViewChild} from '@angular/core';

import {MatPaginator,} from '@angular/material/paginator';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {HistoriqueService} from './service/historique.service';
import {Router} from '@angular/router';
import {HistoriqueServiceService} from '../../dashboard/historique-achats/service/historique-service.service';





export class Historique {
  constructor (
    public  id: string,
    public  Utilisateur: string,
    public  Promotion: string,
    public  Coupon: string,
    public  Remise: string,
    public  Date: Date,
    public  Etat: string,


  ) {}
}

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.scss']
})
export class HistoriqueComponent implements OnInit {
  displayedColumns: string[] = ['Client', 'Promotion', 'Coupon', 'Remise', 'Date' , 'Etat'];
  dataSource = new MatTableDataSource<Historique>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private  historiqueService: HistoriqueService, private router: Router, public dialog: MatDialog ) {
  }

  ngOnInit() {
    this.paginator._intl.itemsPerPageLabel = 'nombre des achats à afficher par page' ;
    this.paginator._intl.nextPageLabel = 'page suivante';
    this.paginator._intl.previousPageLabel = 'page précédente ' ;
    this.paginator._intl.lastPageLabel = 'dernière page';
    this.paginator._intl.firstPageLabel = 'première page' ;
    this.refrechHistorique();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  refrechHistorique() {
    const id = sessionStorage.getItem('commercantId');
    console.log(id);
    this.historiqueService.gethistorique(id).subscribe(
      response => {
        this.dataSource.data = response as Historique[];

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

