import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CategorieService} from '../service/categorie.service';
import {ActivatedRoute, Router} from '@angular/router';
import {mimeType} from '../../../session/signup/mime-type.validator';
import {isUndefined} from "util";

@Component({
  selector: 'app-update-categorie',
  templateUrl: './update-categorie.component.html',
  styleUrls: ['./update-categorie.component.scss']
})
export class UpdateCategorieComponent implements OnInit {
  angForm: FormGroup;
  categorie: any = {};
  imagePreview: string;
  constructor(private route: ActivatedRoute, private router: Router, private ps: CategorieService, private fb: FormBuilder) {
    this.createForm();
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


  updateCategorie() {
    this.route.params.subscribe(params => {
      if (isUndefined(this.angForm.value.image.type)){
        this.ps.updateCategorie(this.angForm.value.CategorieNom, this.angForm.value.CategorieDescription, this.angForm.value.CategoriePriority ,params.id);
      }
      else {
        this.ps.updateCategorieImage(this.angForm.value.CategorieNom, this.angForm.value.CategorieDescription, this.angForm.value.CategoriePriority , this.angForm.value.image,params.id);
      }

      // this.ps.updateCategorie(CategorieNom, CategorieDescription, CategoriePriority , CategorieImage, params.id);

    });
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.ps.editCategorie(params['id']).subscribe(res => {
        console.log(res);
        this.imagePreview=res.CategorieImage;
        this.categorie = res;
        this.angForm.setValue({
          CategorieNom:res.CategorieNom,
          CategorieDescription:res.CategorieDescription,
          CategoriePriority:res.CategoriePriority,
          image:res.CategorieImage
        });
      });
    });
  }
}
