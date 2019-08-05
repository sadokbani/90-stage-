import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss']
})
export class PromotionsComponent implements OnInit {

  filterDateFrom:Date;
  aaa;
  now:Date = new Date();
  constructor() { }

  ngOnInit() {

  }

  aa(){
    // console.log();
    this.aaa=new Date(this.filterDateFrom);
    console.log(this.aaa);
    console.log(this.now);
    // console.log(this.now.getTime());
    // console.log(this.filterDateFrom.getTime());
    console.log(this.aaa.getTime()-this.now.getTime());
  }

  onImagePicked(event){
    console.log(event);
  }
}
