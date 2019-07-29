import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategorieService} from '../../categorie/service/categorie.service';

@Component({
  selector: 'app-ajout-commentaire',
  templateUrl: './ajout-commentaire.component.html',
  styleUrls: ['./ajout-commentaire.component.scss']
})
export class AjoutCommentaireComponent implements OnInit {
  categorie: FormGroup;
  sousCategorie: FormGroup;
  categories:any[];
  selected = '';

  constructor(private _formBuilder: FormBuilder,
              private categorieService: CategorieService) {}

  ngOnInit() {
    this.categorie = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      secondCtrl: ['', Validators.required]
    });
    this.sousCategorie = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    this.categorieService.getCategorie().subscribe(
      (data: any[])  =>{
        this.categories = data;
      }
    )
  }
}
