import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { ShowMessageService } from '../show-message.service';

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
    private showMessageService: ShowMessageService
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
        this.showMessageService.showMessage("Produto removido.", 'message-success')
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

  private productNotFound(err: Error): void {
    console.log(err);
    this.showMessageService.showMessage('Produto não encontrado.', 'message-failed')
    this.cancel();
  }
}
