import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {mimeType} from '../../../session/signup/mime-type.validator';
import {CategorieService} from '../../../dashboard/categorie/service/categorie.service';
import {SouscategorieService} from '../../../dashboard/souscategorie/service/souscategorie.service';
import {DatePipe} from '@angular/common';
import {isUndefined} from 'util';
import {UserService} from '../../../dashboard/users/service/user.service';
import swal from "sweetalert2";
import {ServiceService} from '../service/service.service';
import {PtvService} from '../points-vente/ptv.service';
import {PromotionService} from '../../../dashboard/promotions/service/promotion.service';

@Component({
  selector: 'app-create-promotion',
  templateUrl: './create-promotion.component.html',
  styleUrls: ['./create-promotion.component.scss']
})
export class CreatePromotionComponent implements OnInit {

  public form: FormGroup;
  urls = new Array<string>();
  images = new Array<any>();
  imagePreview: string;

  catecorieSelected = '';
  sousCategorieSelected = '';
    PTVSelected='';
  commercants:any[];
  categories:any[];
  sousCategories:any[];
  PTV:any[];
  id: number;
  hide = true;
  hide1 = true;
  constructor(private fb: FormBuilder,  private route: ActivatedRoute,private router: Router, public dialog: MatDialog ,
              private userService: UserService,
              private categorieService: CategorieService,
              private sousCatService: SouscategorieService,
              private promotionService: ServiceService,
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
      const id = sessionStorage.getItem('commercantId');
      this.PTVService.getPtv(id).subscribe(
          (response: any[]) => {
              this.PTV = response;
          }
      );
    this.id=this.route.snapshot.params['id'];
    if (this.id != -1){
      this.promotionService.retrivePromotin(this.id).subscribe(
        response =>{
          console.log(response);
          this.sousCatService.getSousCategorie_byCategorie(response.categorieNom).subscribe(
            (response: any[]) => {
              this.sousCategories = response;
            }
          );

          this.form.setValue({

            categorieNom: response.categorieNom,
            SousCategorieNom: response.SousCategorieNom,
            PTV: response.PTV,
            promotionNom: response.promotionNom,
            adresse: response.adresse,
            description: response.description,
            dateDebut: this.datePipe.transform(new Date(response.dateDebut),"yyyy-MM-ddTHH:mm"),
            image: response.imagePath[0]
          });
          this.urls = response.imagePath;
        }
      );
    }
    this.form = this.fb.group({

      categorieNom:new FormControl('', Validators.required),
      SousCategorieNom:new FormControl('', Validators.required),
        PTV:new FormControl('', Validators.required),
      promotionNom:new FormControl('', Validators.required),
      adresse:new FormControl('', Validators.required),
      description:new FormControl('', Validators.required),
      dateDebut:new FormControl('', Validators.required),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });
  }

  refrechSouscategorie_byCategorie() {
    this.sousCatService.getSousCategorie_byCategorie(this.catecorieSelected).subscribe(
      (response: any[]) => {
        this.sousCategories = response;
        console.log(response);
      }
    );
  }

    refrechPTV() {
        const id = sessionStorage.getItem('commercantId');
        this.PTVService.getPtv(id).subscribe(
            (response: any[]) => {
                this.PTV = response;
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
            cancelButtonColor: '#9795cf',
            cancelButtonText: 'annuler',
            confirmButtonText: 'ok'
          }) ;
        } else {
          const commercant = sessionStorage.getItem('commercantNom');
          console.log(commercant);
          this.promotionService.addPromotion(commercant,
              this.form.value.promotionNom, this.form.value.SousCategorieNom,
          this.form.value.PTV , this.form.value.adresse, this.form.value.categorieNom,
              this.form.value.dateDebut,this.form.value.description,this.images,periode);

        }
      }
      else {

        if (isUndefined(this.form.value.image.type)){
          console.log('no image');
          console.log(this.form.value);
          this.promotionService.updatePromotion(this.id,this.form.value.commercant,this.form.value.promotionNom,this.form.value.SousCategorieNom,this.form.value.adresse,this.form.value.PTV ,this.form.value.categorieNom,this.form.value.dateDebut,this.form.value.description,[])
        }
        else {
          console.log('image upd');

          this.promotionService.updatePromotion(this.id,this.form.value.commercant,this.form.value.promotionNom,this.form.value.SousCategorieNom,this.form.value.adresse, this.form.value.PTV , this.form.value.categorieNom,this.form.value.dateDebut,this.form.value.description,this.images)
        }

      }
    } else {
      console.log(this.form.value);
      this.openDialog();
    }

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
}
