import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dash-commercant',
  templateUrl: './dash-commercant.component.html',
  styleUrls: ['./dash-commercant.component.scss']
})
export class DashCommercantComponent implements OnInit {
  nom;
  constructor() { }

  ngOnInit() {
    this.nom=sessionStorage.getItem('commercantNom');

  }

}
