// deal.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Deal } from './deal.model';

@Injectable({
  providedIn: 'root'
})
export class DealService {

   // Replace with your actual backend URL
   private baseUrl = 'http://localhost:3000/deals';

   constructor(private http: HttpClient) { }

   // Get all deals from the backend
   getDeals(): Observable<Deal[]> {
     return this.http.get<Deal[]>(this.baseUrl);
   }

   // Create a new deal and send it to the backend
   createDeal(deal: Deal): Observable<Deal> {
     return this.http.post<Deal>(this.baseUrl, deal);
   }

}
