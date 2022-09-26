import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'https://dummyjson.com/auth/users/';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserData(id: number, token: string): Observable<any> {
    const myHeaders = new HttpHeaders().set('Authorization', token);
    return this.http.get(API_URL + id, { headers: myHeaders });
  }
}
