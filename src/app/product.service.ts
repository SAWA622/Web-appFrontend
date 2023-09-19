// product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // Replace with your actual backend URL
  private baseUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) { }

  // Get all products from the backend
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

}
