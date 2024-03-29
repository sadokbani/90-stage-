import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {UserService} from '../../users/service/user.service';
import {mimeType} from '../../../session/signup/mime-type.validator';
import swal from "sweetalert2";
import {CategorieService} from '../../categorie/service/categorie.service';
import {SouscategorieService} from '../../souscategorie/service/souscategorie.service';
import {PromotionService} from '../service/promotion.service';
import {DatePipe} from '@angular/common';
import {isUndefined} from 'util';
import {PtvService} from '../../../dash-commercant/promotion/points-vente/ptv.service';
@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.scss']
})
export class PromotionComponent implements OnInit {

  public form: FormGroup;
  urls = new Array<string>();
  images = new Array<any>();
  imagePreview: string;
  commercantSelected = '';
  catecorieSelected = '';
  sousCategorieSelected ;
  commercants: any[];
  categories: any[];
  sousCategories: any[];
    PTVSelected;
    PTV: any[];
  id: number;
  hide = true;
  hide1 = true;
  constructor(private fb: FormBuilder,  private route: ActivatedRoute,private router: Router, public dialog: MatDialog ,
              private userService: UserService,
              private categorieService: CategorieService,
              private sousCatService: SouscategorieService,
              private promotionService: PromotionService,
              private PTVService: PtvService,
              private datePipe: DatePipe) { }

  ngOnInit() {
    this.userService.retriveAllCommercant().subscribe(
      data=>{
        this.commercants= data.users;
      }
    );
    this.categorieService.getCategorie().subscribe(
      (data: any[])  =>{
        this.categories = data;
      });

    this.id=this.route.snapshot.params['id'];
    if (this.id != -1){
      this.promotionService.retrivePromotin(this.id).subscribe(
        response =>{
          console.log(response);
            console.log(response.commercant);
            this.sousCatService.getSousCategorie_byCategorie(response.categorieNom).subscribe(
              (response: any[]) => {
                this.sousCategories = response;
              }
            );
            console.log(response.commercant);
            this.PTVService.getPtvbyname(response.commercant).subscribe(
                (response: any[]) => {
                    this.PTV = response;

                }
            );
          this.form.setValue({
            commercant: response.commercant,
            categorieNom:response.categorieNom,
            SousCategorieNom:response.SousCategorieNom,
            promotionNom:response.promotionNom,
            quantite:response.nombreStock,
            adresse:response.adresse,
              PTV: response.PTV,
            description:response.description,
            dateDebut:this.datePipe.transform(new Date(response.dateDebut),"yyyy-MM-ddTHH:mm"),
            image:response.imagePath[0]
          });
          this.urls= response.imagePath;
        }
      );
    }
    this.form = this.fb.group({
      commercant:new FormControl('', Validators.required),
      categorieNom:new FormControl('', Validators.required),
      quantite: new FormControl(''),
      SousCategorieNom: new FormControl('', Validators.required),
      promotionNom: new FormControl('', Validators.required),
      adresse: new FormControl('', Validators.required),
        PTV: new FormControl('', Validators.required),
      description:new FormControl('', Validators.required),
      dateDebut:new FormControl('', Validators.required),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });
  }
    refrechPTV() {
        this.PTVService.getPtvbyname(this.commercantSelected).subscribe(
            (response: any[]) => {
                this.PTV = response;
                console.log(response);
                console.log(this.commercantSelected);
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


  onImagePicked(event) {
    // const file = (event.target as HTMLInputElement).files[0];
    // console.log(file);
    // console.log(event);
    // console.log((event.target as HTMLInputElement).files);
    // this.form.patchValue({ image: file });
    // this.form.get("image").updateValueAndValidity();
    // const reader = new FileReader();
    // reader.onload = () => {
    //   this.imagePreview = reader.result;
    // };
    // reader.readAsDataURL(file);
    this.images=[];
    this.urls = [];
    this.form.patchValue({ image: (event.target as HTMLInputElement).files[0] });
    this.form.get("image").updateValueAndValidity();
    let files = event.target.files;
    if (files) {
      for (let file of files) {
        this.images.push(file);
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
    console.log(this.images);
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
  onSubmit(){
    if (this.form.valid){
      if(this.id == -1){
        const date= new Date(this.form.value.dateDebut);
        const dateNow= new Date();
        const periode=date.getTime()-dateNow.getTime();
        if (periode <= 0){
          swal.fire({
            title: 'Erreur',
            text: "Vous devez remplir une date valide",
            type: 'error',
            showCancelButton: false,
            confirmButtonColor: '#64638f',
            cancelButtonText: 'annuler',
            confirmButtonText: 'ok'
          }) ;
        } else {
          this.promotionService.addPromotion(this.form.value.commercant, this.form.value.promotionNom,this.form.value.SousCategorieNom, this.form.value.adresse, this.form.value.ptv ,this.form.value.categorieNom,this.form.value.dateDebut,this.form.value.description,this.images,periode);

        }
      }
      else {

        if (isUndefined(this.form.value.image.type)){

          this.promotionService.updatePromotion(this.id,this.form.value.commercant,this.form.value.promotionNom,this.form.value.SousCategorieNom,this.form.value.adresse, this.form.value.ptv, this.form.value.categorieNom,this.form.value.dateDebut,this.form.value.description,[],this.form.value.quantite)
        }
        else {

          this.promotionService.updatePromotion(this.id,this.form.value.commercant,this.form.value.promotionNom,this.form.value.SousCategorieNom,this.form.value.adresse, this.form.value.ptv, this.form.value.categorieNom,this.form.value.dateDebut,this.form.value.description,this.images,this.form.value.quantite)
        }

      }
    } else {
      console.log(this.form.value);
      this.openDialog();
    }

  }
  tous(){
    let array= new Array();
    for (let i=0;i<this.sousCategories.length;i++){
      array.push(this.sousCategories[i].SousCategorieNom)
    }
    this.sousCategorieSelected=array;
    this.form.value.SousCategorieNom=array;
    this.form.patchValue({ SousCategorieNom:array });
    this.form.get("SousCategorieNom").updateValueAndValidity();


  }
  None(){
    this.sousCategorieSelected='';
    this.form.value.SousCategorieNom=null;

  }

    tous_ptv(){
        let array= new Array();
        for (let i=0;i<this.PTV.length;i++){
            array.push(this.PTV[i].Nom)
        }
        this.PTVSelected=array;
        this.form.value.PTV=array;
        this.form.patchValue({ Nom:array });
        this.form.get("PTV").updateValueAndValidity();


    }
    None_ptv() {
        this.PTVSelected= '';
        this.form.value.PTV= null;

    }
}
