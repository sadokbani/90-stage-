import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {SouscategorieService} from '../service/souscategorie.service';
import {CategorieService} from '../../categorie/service/categorie.service';


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

  constructor(private fb: FormBuilder, private router: Router, private ps: SouscategorieService, private  ps2: CategorieService ) {
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
  addSousCategorie( SousCategorieNom, CategorieNom, Priority ) {
    this.ps.addSousCategorie( SousCategorieNom, CategorieNom, Priority);

  }

  ngOnInit() {
    this.ps2.getCategorie().subscribe((data: Categorie[]) => {
      this.categories = data;
    });
  }


}

