import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ShowMessageService } from '../show-message.service';

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
    private showMessageService: ShowMessageService
  ) { }

  ngOnInit(): void {
  }

  createProduct() {
    this.productService.createProduct(this.product)
      .subscribe(
        () => {
        this.showMessageService.showMessage("Produto criado!", 'message-success')
        this.router.navigateByUrl("/products")
        },
        err => this.showMessageService.showMessage("Tente novamente mais tarde.", 'message-failed')
      )
    
  }

  cancel() {
    this.router.navigateByUrl("/products")
  }
}
