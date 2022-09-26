import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = ' https://dummyjson.com/auth/products/';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getAllProducts(token: string): Observable<any> {
    const myHeaders = new HttpHeaders().set('Authorization', token);
    return this.http.get(API_URL, { headers: myHeaders });
  }

  getProduct(id: number, token: string): Observable<any> {
    const myHeaders = new HttpHeaders().set('Authorization', token);
    return this.http.get(API_URL + id, { headers: myHeaders });
  }
}
