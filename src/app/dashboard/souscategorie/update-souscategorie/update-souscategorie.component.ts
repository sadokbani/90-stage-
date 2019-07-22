import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SouscategorieService} from '../service/souscategorie.service';
import {CategorieService} from '../../categorie/service/categorie.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
class Categorie {
  _id: string;
  CategorieNom: string;
  CategorieDescription: string;
  CategoriePriority: number;
  CategorieImage: string;
}
@Component({
  selector: 'app-update-souscategorie',
  templateUrl: './update-souscategorie.component.html',
  styleUrls: ['./update-souscategorie.component.scss']
})
export class UpdateSouscategorieComponent implements OnInit {

  angForm: FormGroup;
  souscategorie: any = {};
  selected = '';
  cate: Categorie[];
  constructor(private route: ActivatedRoute, private router: Router, private ps: SouscategorieService, private fb: FormBuilder, private  ps2: CategorieService) {
    this.createForm();
  }


  createForm() {
    this.angForm = this.fb.group({
      SousCategorieNom: [ '', Validators.required ],
      SousCategoriePriority: ['', Validators.required ]
    });
  }


  updateSousCategorie( SousCategorieNom, CategorieNom, SousCategoriePriority , id) {
    this.route.params.subscribe(params => {
      this.ps.updateCategorie( SousCategorieNom, CategorieNom, SousCategoriePriority  , params.id);

    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.ps.editCategorie(params['id']).subscribe(res => {
        this.souscategorie = res;
      });
    });
    this.ps2.getCategorie().subscribe((data: Categorie[]) => {
      this.cate = data;
      this.selected = this.souscategorie.CategorieNom;
    });

  }

}
