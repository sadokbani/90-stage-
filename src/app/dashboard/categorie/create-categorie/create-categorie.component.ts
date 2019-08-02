import {Component, Inject, OnInit} from '@angular/core';
import {CategorieService} from '../service/categorie.service';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {mimeType} from '../../../session/signup/mime-type.validator';

import swal from "sweetalert2";





@Component({
  selector: 'app-create-categorie',
  templateUrl: './create-categorie.component.html',
  styleUrls: ['./create-categorie.component.scss']
})

export class CreateCategorieComponent implements OnInit {
  angForm: FormGroup;
  imagePreview: string;

  hide = true;
  hide1 = true;
  constructor(private fb: FormBuilder, private router: Router, private ps: CategorieService , public dialog: MatDialog) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({

      CategorieNom: ['', Validators.required ],
      CategorieDescription: ['', Validators.required ],
      CategoriePriority: ['', Validators.required ],
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });
  }
  openDialog(): void {
    swal.fire({
      title: 'Erreur',
      text: "Vous devez remplir tous les champs et selectioner une image pour continuer",
      type: 'error',
      showCancelButton: false,
      confirmButtonColor: '#64638f',
      cancelButtonColor: '#9795cf',
      cancelButtonText: 'annuler',
      confirmButtonText: 'ok'
    }) ;
  }
  addCategorie( ) {
    if (this.angForm.valid) {
      this.ps.addCategorie(this.angForm.value.CategorieNom, this.angForm.value.CategorieDescription,
        this.angForm.value.CategoriePriority, this.angForm.value.image);
    } else {
      this.openDialog();
    }
  }
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.angForm.patchValue({ image: file });
    this.angForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }
  ngOnInit() {
  }

}

//
// @Component({
//   selector: 'app-createalertcategorie',
//   templateUrl: 'create-categorie-alert.html',
// })
// export class create_alert_categorie {
//
//   constructor(
//               public dialogRef: MatDialogRef<create_alert_categorie>,
//               @Inject(MAT_DIALOG_DATA) public data: any) {
//   }
//
//   onNoClick(): void {
//     this.dialogRef.close();
//   }
// }
