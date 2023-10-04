import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private productService: ProductService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  createProduct() {
    this.productService.createProduct(this.product)
      .subscribe(
        () => {
        this.showMessage('Produto criado!')
        this.router.navigateByUrl("/products")
        },
        err => this.showMessage('Houve um problema, tente novamente mais tarde.')
      )
    
  }

  cancel() {
    this.router.navigateByUrl("/products")
  }

  private showMessage(message: string): void {
    this.snackBar.open(message, 'x', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    })
  }
}
