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
    /*getCategories() {
      return this.http.get<Category[]>(
        environment.apiUrl + '/customer/categories'
      );
    }
    getBrands() {
      return this.http.get<Brand[]>(
        environment.apiUrl + '/customer/brands'
      );
    }*/
    getProducts(
      searchTerm:string,
      categoryId:string,
      sortBy:string,
      sortOrder:number,
      brandId:string,
      page:number,
      pageSize:number

    ) { 
      const url = `${environment.apiUrl}/customer/products?searchTerm=${encodeURIComponent(searchTerm)}
      &categoryId=${encodeURIComponent(categoryId)}&sortBy=${encodeURIComponent(sortBy)}
      &sortOrder=${sortOrder}
      &brandId=${encodeURIComponent(brandId)}&page=${page}&pageSize=${pageSize}`;
      return this.http.get<product[]>(url);
      }
    getProductById(id:string){
      return this.http.get<product>(
        environment.apiUrl+ '/customer/product/' + id);
    }
   

  }
