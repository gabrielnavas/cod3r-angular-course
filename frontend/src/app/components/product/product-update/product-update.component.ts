import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { ShowMessageService } from '../show-message.service';

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

  updateProduct(): void {
    this.productService.update(this.product)
      .subscribe(() => {
        this.initProduct()
        this.showMessageService.showMessage('Produto atualizado com sucesso!', 'message-success')
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

  private productNotFound(err: Error): void {
    console.log(err);
    this.showMessageService.showMessage('Produto não encontrado.', 'message-failed')
    this.cancel();
  }
}
