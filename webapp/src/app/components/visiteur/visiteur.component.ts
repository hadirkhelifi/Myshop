import { Component, inject, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { product } from '../../types/product';
import { MatButtonModule } from '@angular/material/button';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { WishlistService } from '../../services/wishlist.service';
import { Category } from '../../types/category';
import { CategoryService } from '../../services/category.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-visiteur',
  imports: [
    MatButtonModule,
    ProductCardComponent,
    CarouselModule,
    RouterLink,
    FormsModule
  ],
  templateUrl: './visiteur.component.html',
  styleUrl: './visiteur.component.scss',
})
export class VisiteurComponent implements OnInit {
  // Owl carousel options
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    nav: true,
  };

  // Services injectés
  private categoryService = inject(CategoryService);
  private customerService = inject(CustomerService);
  private wishlistService = inject(WishlistService);
  private router = inject(Router);

  // Propriétés
  categoryList: Category[] = [];
  newProducts: product[] = [];
  featuredProducts: product[] = [];
  bannerImages: product[] = [];
  userName: string | null = null;
  searchTerm: string = '';

  ngOnInit(): void {
    // Chargement des produits mis en avant
    this.customerService.getFeaturedProducts().subscribe((result) => {
      this.featuredProducts = result;
      console.log('Featured Products:', this.featuredProducts);
      this.bannerImages.push(...result);
    });

    // Chargement des nouveaux produits
    this.customerService.getNewProducts().subscribe((result) => {
      this.newProducts = result;
      console.log('New Products:', this.newProducts);
      this.bannerImages.push(...result);
    });

    // Initialisation de la liste de souhaits
    this.wishlistService.init();

    // Chargement des catégories
    this.categoryService.getCategories().subscribe((result) => {
      this.categoryList = result;
      console.log('Categories:', this.categoryList);
    });

    // Récupération du nom d'utilisateur
    this.userName = localStorage.getItem('username');
    console.log('User Name:', this.userName);
  }

  // Recherche de produits
  onSearch(e: Event): void {
    const target = e.target as HTMLInputElement;
    if (target.value) {
      this.router.navigateByUrl(`/products?search=${target.value}`);
    }
  }

  // Recherche par catégorie
  searchCategory(id: string): void {
    this.searchTerm = '';
    this.router.navigateByUrl(`/products?categoryId=${id}`);
  }
}
