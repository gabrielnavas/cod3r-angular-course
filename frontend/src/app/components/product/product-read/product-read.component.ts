import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ShowMessageService } from '../show-message.service';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'price', 'actions']

  products: Product[] = []

  constructor(
    private productService: ProductService,
    private showMessageService: ShowMessageService
  ) { }

  ngOnInit(): void {
    this.readProducts()
  }

  private readProducts(): void {
    this.productService.read()
      .subscribe(
        (products: Product[]) => {
          if(products.length === 0) {
            this.showMessageService.showMessage('Nenhum produto encontrado', 'message-failed')
          } else {
            this.products = products
          }
        },
        err => this.showMessageService.showMessage("Tente novamente mais tarde.", 'message-failed')
      )
  }
}
