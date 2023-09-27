import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  propLegal = "qualquer"

  constructor(
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  fazerAlgo() {
    console.log('fazendo algo');
  }

  backPage() {
    this.location.back();
  }
}
