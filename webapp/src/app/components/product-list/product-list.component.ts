import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { CustomerService } from '../../services/customer.service';
import { product } from '../../types/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [HeaderComponent, ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'] // Corrigez 'styleUrl' en 'styleUrls'
})
export class ProductListComponent {
  customerServices = inject(CustomerService);
  searchTerm: string = '';
  categoryId: string = '';
  sortBy: string = '';
  sortOrder: number = -1;
  brandId: string = '';
  page = 1;
  pageSize = 6;
  products: product[] = [];
  route = inject(ActivatedRoute);

  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
      this.searchTerm = params.search || '';
      this.categoryId = params.categoryId ? params.categoryId.trim() : '';
      this.getProducts();
    });
  }

  getProducts() {
    console.log('Fetching products with:', {
      searchTerm: this.searchTerm,
      categoryId: this.categoryId,
      sortBy: this.sortBy,
      sortOrder: this.sortOrder,
      brandId: this.brandId,
      page: this.page,
      pageSize: this.pageSize
  });

  this.customerServices
      .getProducts(
          this.searchTerm,
          this.categoryId,
          this.sortBy,
          this.sortOrder,
          this.brandId,
          this.page,
          this.pageSize
      )
      .subscribe(result => {
          console.log('Products fetched:', result);
          this.products = result;
      });
  }
}