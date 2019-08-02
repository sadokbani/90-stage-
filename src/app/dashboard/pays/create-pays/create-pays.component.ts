import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {PaysService} from '../service/pays.service';

import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import swal from "sweetalert2";
import {SouscategorieService} from '../../souscategorie/service/souscategorie.service';
import {CategorieService} from '../../categorie/service/categorie.service';

class Pays {
  _id: string;
  Nom: string;
  Priority: number;

}
@Component({
  selector: 'app-create-pays',
  templateUrl: './create-pays.component.html',
  styleUrls: ['./create-pays.component.scss']
})
export class CreatePaysComponent implements OnInit {

  angForm: FormGroup;

  selected = '';
  hide = true;
  hide1 = true;
  categories: Pays[];

  constructor(private fb: FormBuilder, private router: Router, private paysService: PaysService, public dialog: MatDialog) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({

      Nom: ['', Validators.required],
      Priority: ['', Validators.required],
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
    });
  }

  addPays(Nom, Priority) {
    if (this.angForm.valid) {
      this.paysService.addPays(Nom, Priority);
    } else {
      this.openDialog();
    }
  }

  ngOnInit() {

  }
}
