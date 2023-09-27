import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  product: Product = {
    name: "",
    price: 0.0,
  }

  constructor(
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
  }

  createProduct() {
    this.productService.createProduct(this.product)
      .subscribe(
        () => {
        this.productService.showOn('Produto criado!')
        this.router.navigateByUrl("/products")
        },
        err => this.productService.showOn('Houve um problema, tente novamente mais tarde.')
      )
    
  }

  cancel() {
    this.router.navigateByUrl("/products")
  }
}
