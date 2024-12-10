import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { product } from '../types/product';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  http=inject(HttpClient);
  constructor() { }
  getNewProducts(){
    return this.http.get<product[]>(
      environment.apiUrl+ '/customer/new-products'
    );
  }
  getFeaturedProducts(){
    return this.http.get<product[]>(
      environment.apiUrl+ '/customer/featured-products'
    );
  }
}
