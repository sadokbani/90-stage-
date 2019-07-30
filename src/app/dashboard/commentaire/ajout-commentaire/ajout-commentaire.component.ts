import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategorieService} from '../../categorie/service/categorie.service';
import {SouscategorieService} from '../../souscategorie/service/souscategorie.service';
import {UserService} from '../../users/service/user.service';
import {CommentaireService} from '../service/commentaire.service';
import {MatDialogRef} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-ajout-commentaire',
  templateUrl: './ajout-commentaire.component.html',
  styleUrls: ['./ajout-commentaire.component.scss']
})
export class AjoutCommentaireComponent implements OnInit {
  categorie: FormGroup;
  sousCategorie: FormGroup;
  promotion: FormGroup;
  user: FormGroup;
  commentaire: FormGroup;
  categories:any[];
  sousCategories:any[];
  users:any[];
  catecorieSelected = '';
  sousCategorieSelected = '';
  UserSelected :any;

  constructor(private _formBuilder: FormBuilder,
              private categorieService: CategorieService,
              private sousCatService: SouscategorieService,
              private userService: UserService,
              private commentaireService: CommentaireService,
              public dialogRef: MatDialogRef<AjoutCommentaireComponent>,
              private router:Router,
  ) {}

  ngOnInit() {
    this.categorie = this._formBuilder.group({
      nom: ['', Validators.required]
    });
    this.sousCategorie = this._formBuilder.group({
      nom: ['', Validators.required]
    });
   this.promotion = this._formBuilder.group({
        nom: ['', Validators.required]
      });
   this.user = this._formBuilder.group({
        nom: ['', Validators.required]
      });
   this.commentaire = this._formBuilder.group({
        com: ['', Validators.required]
      });

    this.categorieService.getCategorie().subscribe(
      (data: any[])  =>{
        this.categories = data;
      });

    this.userService.retriveAllCommercant().subscribe(
      data  =>{
        this.users=data.users;
      }
    );
  }

  refrechSouscategorie_byCategorie() {
    this.sousCatService.getSousCategorie_byCategorie(this.catecorieSelected).subscribe(
      (response: any[]) => {
        this.sousCategories = response;
        console.log(response);
      }
    );
  }


  ajouter(){
    console.log(this.categorie.value.nom);
    console.log(this.sousCategorie.value.nom);
    console.log(this.promotion.value.nom);
    console.log(this.user.value.nom);
    console.log(this.UserSelected);
    console.log(this.commentaire.value.com);
    this.commentaireService.addComment({
      categorieNom:this.categorie.value.nom,
      SousCategorieNom:this.sousCategorie.value.nom,
      promotionNom:this.promotion.value.nom,
      commentaire:this.commentaire.value.com,
      user:{
        nom:this.user.value.nom.nom,
        email:this.user.value.nom.email
      }
    }).subscribe(
      data =>{
        this.dialogRef.close();
      }
    );
  }
}

