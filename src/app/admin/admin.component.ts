import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { Deal } from '../deal.model';
import { DealService } from '../deal.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  products: Product[] = [];
  deals: Deal[] = [];
  newDeal: Deal = {
    name: '',
    description: '',
    discount: 0,
    products: [],
  };

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
    const index = this.newDeal.products.indexOf(product);
    if (index > -1) {
      this.newDeal.products.splice(index, 1);
    } else {
      this.newDeal.products.push(product);
    }
  }
  isSelected(product: Product) {
    return this.newDeal.products.includes(product);
  }

  createDeal() {
    if (
      this.newDeal.name &&
      this.newDeal.description &&
      this.newDeal.discount > 0 &&
      this.newDeal.products.length > 0
    ) {
      this.dealService.createDeal(this.newDeal).subscribe((deal) => {
        this.deals.push(deal);
        this.newDeal = {
          name: '',
          description: '',
          discount: 0,
          products: [],
        };
      });
    } else {
      alert(
        'Please fill in all the fields and select at least one product for the new deal.'
      );
    }
  }
}
