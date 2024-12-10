import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CategoriesComponent } from './components/manage/categories/categories.component';
import { CategoriesFormComponent } from './components/manage/categories-form/categories-form.component';
import { BrandFormComponent } from './components/manage/brand-form/brand-form.component';
import { BrandsComponent } from './components/manage/brands/brands.component'; // Import BrandsComponent
import { ProductComponent } from './components/manage/produts/produts.component'; // Corrected import
import { ProductFormComponent } from './components/manage/product-form/product-form.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'admin/categories/add',
    component: CategoriesFormComponent,
  },
  {
    path: 'admin/categories/:id',
    component: CategoriesFormComponent,
  },
  {
    path: 'admin/categories',
    component: CategoriesComponent,
  },
  {
    path: 'admin/brands/add',
    component: BrandFormComponent,
  },
  {
    path: 'admin/brands/:id',
    component: BrandFormComponent,
  },
  {
    path: 'admin/brands', // Correct here
    component: BrandsComponent, // Assign the correct component
  },
  {
    path: 'admin/products',
    component: ProductComponent, // Liste des produits
  },
  {
    path: 'admin/products/add',
    component: ProductFormComponent, // Formulaire pour ajouter un produit
  },
  {
    path: 'admin/products/:id',
    component: ProductFormComponent, // Formulaire pour modifier un produit
  },
  {
    path: 'products',
    component: ProductListComponent,
  },
  {
    path: 'products/:id',
    component: ProductDetailComponent,
  },
  { path: 'register', component: RegisterComponent,}
];
