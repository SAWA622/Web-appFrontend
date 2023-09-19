// combo.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Combo } from './combo.model';

@Injectable({
  providedIn: 'root'
})
export class ComboService {

  // Replace with your actual backend URL
  private baseUrl = 'http://localhost:3000/combos';

  constructor(private http: HttpClient) { }

  // Get all combos from the backend
  getCombos(): Observable<Combo[]> {
    return this.http.get<Combo[]>(this.baseUrl);
  }

  // Suggest the best combo(s) for the given products
  suggestCombos(productIds: string[]): Observable<Combo[]> {
    return this.http.get<Combo[]>(`${this.baseUrl}/suggest?products=${productIds.join(',')}`);
  }

}
