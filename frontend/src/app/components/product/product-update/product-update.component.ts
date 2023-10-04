import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

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

  updateProduct(): void {
    this.productService.update(this.product)
      .subscribe(() => {
        this.initProduct()
        this.showMessage('Produto atualizado com sucesso!')
        this.router.navigateByUrl("products")
      })
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
