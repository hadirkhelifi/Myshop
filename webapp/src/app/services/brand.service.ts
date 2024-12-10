import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Brand } from '../types/brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor() {}
  http=inject(HttpClient);

  getBrands(){
    return this.http.get<Brand[]>("http://localhost:3000/brand");
  }

  getBrandsById(id: string) {
    return this.http.get<Brand>('http://localhost:3000/brand/' + id);
}

  addBrands(name:string){
    return this.http.post('http://localhost:3000/brand', {
      name: name,
    });


  }
  updateBrands(id: string, name: string) {
    return this.http.put(`http://localhost:3000/brand/${id}`, {
        name: name,
    });
}

  deleteBrandsById(id: string){
    return this.http.delete('http://localhost:3000/brand/' + id);
  }
}
