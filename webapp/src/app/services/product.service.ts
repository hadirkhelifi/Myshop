import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { product } from '../types/product';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }
  http=inject(HttpClient);

  getAllProducts() {
    const url = `${environment.apiUrl}/product`;
    console.log('Appel API GET:', url); // Vérifie l'URL de l'appel
    return this.http.get<product[]>(url).pipe(
      tap(data => console.log('Données récupérées:', data)), // Affiche les données reçues
      catchError(error => {
        console.error('Erreur lors de l\'appel API:', error);
        return throwError(error);
      })
    );
  }
  

  getProductbyId(id: string){
    return this.http.get<product>(environment.apiUrl+ '/product/'+ id);
  }
  addProduct(model: product){
    return this.http.post(environment.apiUrl+ '/product/', model);
  }

  updateProduct(id: string, model: product){
    return this.http.put(environment.apiUrl+ '/product/'+ id, model);
  }
  deleteProductById(id: string){
    return this.http.delete('http://localhost:3000/product/' + id);
  }

}