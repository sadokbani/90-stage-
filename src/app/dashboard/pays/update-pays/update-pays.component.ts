import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PaysService} from '../service/pays.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

class Pays {
  _id: string;
 Nom: string;
 Priority: number;

}
@Component({
  selector: 'app-update-pays',
  templateUrl: './update-pays.component.html',
  styleUrls: ['./update-pays.component.scss']
})
export class UpdatePaysComponent implements OnInit {

  angForm: FormGroup;
 pays: any = {};
  selected = '';
  c: Pays[];
  constructor(private route: ActivatedRoute, private router: Router, private paysService: PaysService, private fb: FormBuilder, ) {
    this.createForm();
  }


  createForm() {
    this.angForm = this.fb.group({
      Nom: [ '', Validators.required ],
      Priority: ['', Validators.required ]
    });
  }


  updatePays(Nom, Priority , id) {
    this.route.params.subscribe(params => {
      this.paysService.updatePays(Nom, Priority  , params.id);

    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.paysService.editPays(params['id']).subscribe(res => {
        this.pays = res;
      });
    });
    this.paysService.getPays().subscribe((data: Pays[]) => {
      this.c = data;
      this.selected = this.pays.Nom;
    });

  }

}
