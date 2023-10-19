// product.component.ts
import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { Deal } from '../deal.model';
import { DealService } from '../deal.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  selectedProducts: Product[] = [];
  deals: Deal[] = [];

  totalPrice: number = 0;
  bestPrice: number = 0;

  constructor(
    private productService: ProductService,
    private dealService: DealService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
    this.dealService.getDeals().subscribe((deals) => {
      this.deals = deals;
    });
  }

  toggleProduct(product: Product) {
    const index = this.selectedProducts.indexOf(product);
    if (index > -1) {
      this.selectedProducts.splice(index, 1);
    } else {
      this.selectedProducts.push(product);
    }
    this.updatePrices;
  }

  isSelected(product: Product) {
    return this.selectedProducts.includes(product);
  }

  updatePrices() {
    this.totalPrice = 0;
    this.bestPrice = 0;

    for (let product of this.selectedProducts) {
      this.totalPrice += product.price;
    }

    this.bestPrice = this.totalPrice;

    for (let deal of this.deals) {
      const containsAll = this.selectedProducts.every((product) =>
        deal.products.some((p) => p._id === product._id)
      );

      if (containsAll) {
        let discountedPrice = 0;
        for (let product of deal.products) {
          discountedPrice += product.price * (1 - deal.discount / 100);
        }
        if (discountedPrice < this.bestPrice) {
          this.bestPrice = discountedPrice;
        }
      }
    }
  }
}
