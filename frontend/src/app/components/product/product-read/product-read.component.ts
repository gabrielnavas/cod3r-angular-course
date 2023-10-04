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

  displayedColumns: string[] = ['id', 'name', 'price', 'actions']

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
        err => this.showMessage('Tente novamente mais tarde.')
      )
  }

  private showMessage(message: string): void {
    this.snackBar.open(message, 'x', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    })
  }
}
