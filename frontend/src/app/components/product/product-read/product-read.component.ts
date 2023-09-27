import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements OnInit {

  products: Product[] = []

  constructor(
    private productService: ProductService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.readProducts()
  }

  private readProducts(): void {
    this.productService.read()
      .subscribe(
        (products: Product[]) => this.products = products,
        err => this.productService.showOn('Tente novamente mais tarde.')
      )
  }

}
