import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomValidators} from 'ng2-validation';
import {mimeType} from '../../../session/signup/mime-type.validator';
import {UserService} from '../service/user.service';
import {isUndefined} from "util";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';

import swal from "sweetalert2";
const password = new FormControl('', Validators.required);
const confirmPassword = new FormControl('', CustomValidators.equalTo(password));
@Component({
  selector: 'app-commercant',
  templateUrl: './commercant.component.html',
  styleUrls: ['./commercant.component.scss']
})
export class CommercantComponent implements OnInit {
  public form: FormGroup;
  imagePreview: string;
  id: number;
  hide = true;
  hide1 = true;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, public dialog: MatDialog,
              private userService: UserService) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    if (this.id != -1) {
      this.userService.retriveUser(this.id).subscribe(
        response => {
          console.log(response);
          this.imagePreview = response.imagePath;
          this.form.setValue({
            nom: response.nom,
            email: response.email,
            password: null,
            confirmPassword: null,
            image: response.imagePath
          });
        }
      );
    }
    this.form = this.fb.group({
      email: [
        null,
        Validators.compose([Validators.required, CustomValidators.email])
      ],
      nom: new FormControl('', Validators.required),
      password: password,
      confirmPassword: confirmPassword,
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
      type: 'warning',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'annuler',
      confirmButtonText: 'ok'
    }) ;
  }
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.id == -1) {
        this.userService.addCommercant(this.form.value.nom, this.form.value.email, this.form.value.password, this.form.value.image);
      }
      else {

        if (isUndefined(this.form.value.image.type)) {
          this.userService.updateCommercant(this.id, this.form.value.nom, this.form.value.email, this.form.value.password);
        }
        else {
          this.userService.updateCommercantImage(this.id, this.form.value.nom, this.form.value.email, this.form.value.password, this.form.value.image);
        }

      }
    } else {
      this.openDialog();
    }
  }
}

// @Component({
//   selector: 'app-createalertcommerçant',
//   templateUrl: 'create-commerçant-alert.html',
// })
// export class create_commerçant_alert {
//
//   constructor(
//     public dialogRef: MatDialogRef<create_commerçant_alert>,
//     @Inject(MAT_DIALOG_DATA) public data: any) {
//   }
//
//   onNoClick(): void {
//     this.dialogRef.close();
//   }
// }

