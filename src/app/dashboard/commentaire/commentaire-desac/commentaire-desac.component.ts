import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';
import {CommentaireService} from '../service/commentaire.service';
import swal from "sweetalert2";

@Component({
  selector: 'app-commentaire-desac',
  templateUrl: './commentaire-desac.component.html',
  styleUrls: ['./commentaire-desac.component.scss']
})
export class CommentaireDesacComponent implements OnInit {

  displayedColumns: string[] = ['categorieNom', 'SousCategorieNom', 'promotionNom', 'commentaire', 'user', 'dateCreation', 'actions'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  value = '';

  constructor(private router: Router,
              private commentaireService: CommentaireService) { }

  ngOnInit() {
    this.paginator._intl.itemsPerPageLabel = 'nombre des clients à afficher par page';
    this.paginator._intl.nextPageLabel = 'page suivante';
    this.paginator._intl.previousPageLabel = 'page précédente ' ;
    this.paginator._intl.lastPageLabel = 'dernière page';
    this.paginator._intl.firstPageLabel = 'première page' ;
    this.refrechCommentaires();
  }

  refrechCommentaires() {
    this.commentaireService.retriveAllCommentsDes().subscribe(
      response => {
        this.dataSource.data = response.commentaires as any[];
      }
    );
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  activer(id): void {
    swal.fire({
      title: 'voulez-vous vraiment activer cette commentaire',
      text: "",
      type: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'annuler',
      confirmButtonText: 'oui'
    }).then((result) => {
      if (result.value) {
        this.commentaireService.activerComments(id).subscribe(
          data => {
            console.log(data);
            swal.fire(
              'cette commentaire a été activé',
              '',
              'success'
            );
            this.refrechCommentaires();
            if (this.dataSource.data.length-1 == 0 ) this.router.navigate(['admin/commentaire']);
          }
        );
      }
    });

  }


}
