// product.component.ts
import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { Deal } from '../deal.model';
import { DealService } from '../deal.service';
import { Combo } from '../combo.model';
import { ComboService } from '../combo.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: Product[] = []; // All products
  selectedProducts: Product[] = []; // Products selected by the user
  deals: Deal[] = []; // All deals
  combos: Combo[] = []; // All combos
  suggestedCombos: Combo[] = []; // Suggested combos for the selected products
  totalPrice: number = 0; // Total price of the selected products without any deal or combo applied
  bestPrice: number = 0; // Best price of the selected products with the best deal or combo applied

  constructor(
    private productService: ProductService,
    private dealService: DealService,
    private comboService: ComboService
  ) { }

  ngOnInit(): void {
    // Fetch all products, deals and combos from the backend services
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
    this.dealService.getDeals().subscribe(deals => {
      this.deals = deals;
    });
    this.comboService.getCombos().subscribe(combos => {
      this.combos = combos;
    });
  }

  // Add or remove a product to or from the selected products array
  toggleProduct(product: Product) {
    const index = this.selectedProducts.indexOf(product);
    if (index > -1) {
      // Remove the product if already selected
      this.selectedProducts.splice(index, 1);
    } else {
      // Add the product if not selected
      this.selectedProducts.push(product);
    }
    // Update the prices and suggestions based on the new selection
    this.updatePrices();
    this.updateSuggestions();
  }

  // Check if a product is selected or not
  isSelected(product: Product) {
    return this.selectedProducts.includes(product);
  }
  updateSuggestions() {
    // Reset the suggested combos array
    this.suggestedCombos = [];
    // Get the ids of the selected products
    const productIds = this.selectedProducts.map(product => product._id);
    // Filter out any undefined values from the productIds array
    // Map any undefined values in the array to empty strings
const mappedProductIds = productIds.map(id => id || '');

    // If there are more than one product selected, fetch the suggested combos from the backend service
    if (mappedProductIds.length > 1) {
      // Pass the mapped array to the function
this.comboService.suggestCombos(mappedProductIds).subscribe(combos => {
  // Do something with the combos
        this.suggestedCombos = this.combos;
      });
    }
  }
  // Update the total price and best price based on the selected products
  updatePrices() {
    // Reset the prices to zero
    this.totalPrice = 0;
    this.bestPrice = 0;
    // Loop through each selected product and add its price to the total price
    for (let product of this.selectedProducts) {
      this.totalPrice += product.price;
    }
    // Set the best price to be equal to the total price initially
    this.bestPrice = this.totalPrice;
    // Loop through each deal and check if it applies to the selected products
    for (let deal of this.deals) {
      // Check if the deal contains all of the selected products
      const containsAll = this.selectedProducts.every(product =>
        deal.products.some(p => p._id === product._id)
      );
      // If yes, calculate the discounted price for the deal and compare it with the best price
      if (containsAll) {
        let discountedPrice = 0;
        for (let product of deal.products) {
          discountedPrice += product.price * (1 - deal.discount / 100);
        }
        if (discountedPrice < this.bestPrice) {
          // Update the best price if the discounted price is lower than the current best price
          this.bestPrice = discountedPrice;
        }
      }
    }
    // Loop through each suggested combo and compare its price with the best price
    for (let combo of this.suggestedCombos) {
      if (combo.price < this.bestPrice) {
        // Update the best price if
        // product.component.ts (continued)
        // Update the best price if the combo price is lower than the current best price
        this.bestPrice = combo.price;
      }
    }
  }

  // Update the suggested combos based on the selected products
  
}
