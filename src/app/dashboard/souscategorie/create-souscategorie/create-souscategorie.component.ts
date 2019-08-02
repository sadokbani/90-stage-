import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {SouscategorieService} from '../service/souscategorie.service';
import {CategorieService} from '../../categorie/service/categorie.service';

import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import swal from "sweetalert2";


class Categorie {
  _id: string;
  CategorieNom: string;
  CategorieDescription: string;
  CategoriePriority: number;
  CategorieImage: string;
}

@Component({
  selector: 'app-create-souscategorie',
  templateUrl: './create-souscategorie.component.html',
  styleUrls: ['./create-souscategorie.component.scss']
})
export class CreateSouscategorieComponent implements OnInit {
  angForm: FormGroup;

  selected = '';
  hide = true;
  hide1 = true;
  categories: Categorie[];

  constructor(private fb: FormBuilder, private router: Router, private ps: SouscategorieService, private  ps2: CategorieService , public dialog: MatDialog) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({

      SousCategorieNom: ['', Validators.required ],
      SousCategoriePriority: ['', Validators.required ],
      CategorieNom: ['', Validators.required ],
      SousCategorieImage: '',
    });
  }
  openDialog(): void {
    swal.fire({
      title: 'Erreur',
      text: "Vous devez remplir tous les champs  pour continuer",
      type: 'error',
      showCancelButton: false,
      confirmButtonColor: '#64638f',
      cancelButtonColor: '#9795cf',

      confirmButtonText: 'ok'
    }) ;
  }
  addSousCategorie( SousCategorieNom, CategorieNom, Priority ) {
    if(this.angForm.valid) {
      this.ps.addSousCategorie(SousCategorieNom, CategorieNom, Priority);
    } else {
      this.openDialog();
    }
  }

  ngOnInit() {
    this.ps2.getCategorie().subscribe((data: Categorie[]) => {
      this.categories = data;
    });
  }


}
// @Component({
//   selector: 'app-createalertsouscategorie',
//   templateUrl: 'create-alert-souscategorie.html',
// })
// export class create_alert_souscategorie {
//
//   constructor(
//     public dialogRef: MatDialogRef<create_alert_souscategorie>,
//     @Inject(MAT_DIALOG_DATA) public data: any) {
//   }
//
//   onNoClick(): void {
//     this.dialogRef.close();
//   }
// }

