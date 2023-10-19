import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Deal } from './deal.model';

@Injectable({
  providedIn: 'root',
})
export class DealService {
  private baseUrl = 'https://thisis-6el4.onrender.com/deals';

  constructor(private http: HttpClient) {}

  getDeals(): Observable<Deal[]> {
    return this.http.get<Deal[]>(this.baseUrl);
  }

  createDeal(deal: Deal): Observable<Deal> {
    return this.http.post<Deal>(this.baseUrl, deal);
  }
}
