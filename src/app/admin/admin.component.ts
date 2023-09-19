// admin.component.ts
import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { Deal } from '../deal.model';
import { DealService } from '../deal.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  products: Product[] = []; // All products
  deals: Deal[] = []; // All deals
  newDeal: Deal = { // A new deal object to be created
    name: '',
    description: '',
    discount: 0,
    products: []
  };

  constructor(
    private productService: ProductService,
    private dealService: DealService
  ) { }

  ngOnInit(): void {
    // Fetch all products and deals from the backend services
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
    this.dealService.getDeals().subscribe(deals => {
      this.deals = deals;
    });
  }

  // Add or remove a product to or from the new deal object
  toggleProduct(product: Product) {
    const index = this.newDeal.products.indexOf(product);
    if (index > -1) {
      // Remove the product if already selected
      this.newDeal.products.splice(index, 1);
    } else {
      // Add the product if not selected
      this.newDeal.products.push(product);
    }
  }

  // Check if a product is selected or not for the new deal object
  isSelected(product: Product) {
    return this.newDeal.products.includes(product);
  }

  // Create a new deal and send it to the backend service
  createDeal() {
    // Validate the new deal object before sending it
    if (this.newDeal.name && this.newDeal.description && this.newDeal.discount > 0 && this.newDeal.products.length > 0) {
      this.dealService.createDeal(this.newDeal).subscribe(deal => {
        // Add the created deal to the deals array
        this.deals.push(deal);
        // Reset the new deal object
        this.newDeal = {
          name: '',
          description: '',
          discount: 0,
          products: []
        };
      });
    } else {
      // Show an alert message if the new deal object is invalid
      alert('Please fill in all the fields and select at least one product for the new deal.');
    }
  }

}
