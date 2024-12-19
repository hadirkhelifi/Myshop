import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { product } from '../types/product';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor() {}
  http = inject (HttpClient);
  wishlists: product[] = [];
  init() {
    this.getWishlists().subscribe((result) => {
      this.wishlists = result;
    });
     
  }

  getWishlists() {
    return this.http.get<product[]>(environment.apiUrl + '/customer/wishlists');
  }
  addWishlist(productId:string) {
    return this.http.post(environment.apiUrl + '/customer/wishlists'+productId,{});
  }
  removeFromWishlists(productId:string) {
    return this.http.delete(environment.apiUrl + '/customer/wishlists'+productId);
  }
  
   
}
