import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';
import {CommentaireService} from './service/commentaire.service';
import swal from "sweetalert2";
import {AjoutCommentaireComponent} from './ajout-commentaire/ajout-commentaire.component';

@Component({
  selector: 'app-commentaire',
  templateUrl: './commentaire.component.html',
  styleUrls: ['./commentaire.component.scss']
})
export class CommentaireComponent implements OnInit {

  displayedColumns: string[] = ['categorieNom', 'SousCategorieNom', 'promotionNom', 'commentaire', 'user', 'dateCreation', 'actions'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  value = '';

  constructor(private router: Router,
              private dialog: MatDialog,
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
    this.commentaireService.retriveAllCommentsAc().subscribe(
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

  desactiver(id): void {
    swal.fire({
      title: 'voulez-vous vraiment désactiver cette commentaire',
      text: "",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'annuler',
      confirmButtonText: 'oui'
    }).then((result) => {
      if (result.value) {
        this.commentaireService.desactiverComments(id).subscribe(
          data => {
            console.log(data);
            swal.fire(
              'cette commentaire a été désactivé',
              '',
              'success'
            );
            this.refrechCommentaires();
          }
        );
      }
    });

  }

 supprimer(id): void {
    swal.fire({
      title: 'voulez-vous vraiment supprimer cette commentaire',
      text: "",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'annuler',
      confirmButtonText: 'oui'
    }).then((result) => {
      if (result.value) {
        this.commentaireService.deleteComment(id).subscribe(
          data => {
            console.log(data);
            swal.fire(
              'cette commentaire a été supprimé',
              '',
              'success'
            );
            this.refrechCommentaires();
          }
        );
      }
    });

  }

  ajouter(){
    const dialogConfig= new MatDialogConfig();
    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.maxHeight=window.innerHeight-50 + 'px';
    this.dialog.open(AjoutCommentaireComponent, dialogConfig);
  }

}
