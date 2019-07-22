import { Component, OnInit } from '@angular/core';
import {CategorieService} from '../service/categorie.service';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {mimeType} from '../../../session/signup/mime-type.validator';

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
  constructor(private fb: FormBuilder, private router: Router, private ps: CategorieService) {
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
  addCategorie( ) {
    this.ps.addCategorie( this.angForm.value.CategorieNom, this.angForm.value.CategorieDescription,
      this.angForm.value.CategoriePriority, this.angForm.value.image);
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
