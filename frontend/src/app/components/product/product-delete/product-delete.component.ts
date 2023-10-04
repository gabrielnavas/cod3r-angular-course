import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  product: Product

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute, 
    private productService: ProductService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.initProduct();
    const productId = this.activatedRoute.snapshot.paramMap.get("id");
    this.productService.readById(productId).subscribe(
      productFind => this.product = productFind,
      err => this.productNotFound(err)
    )
  }

  confirmDeleteProduct(): void {
    this.productService.delete(this.product.id.toString()).subscribe(
      () => {
        this.showMessage("Produto removido.")
        this.router.navigateByUrl("products")
      },
      err => this.productNotFound(err)
    )
  }


  cancel(): void {
    this.initProduct()
    this.router.navigateByUrl("products")
  }

  private initProduct(): void {
    this.product = {
      id: 0,
      name: "",
      price: 0.0,
    }
  }

  private showMessage(message: string): void {
    this.snackBar.open(message, 'x', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    })
  }

  private productNotFound(err: Error): void {
    console.log(err);
    this.showMessage('Produto não encontrado.')
    this.cancel();
  }
}
