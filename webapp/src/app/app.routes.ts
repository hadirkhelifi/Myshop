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
import { LoginComponent } from './components/login/login.component';
import { AdminDashbaordComponent } from './components/manage/admin-dashbaord/admin-dashbaord.component';
import { VisiteurComponent } from './components/visiteur/visiteur.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { CommandeComponent } from './components/commande/commande.component';
import { CommandeFormComponent } from './components/commande-form/commande-form.component';
import { CommandeClientComponent } from './components/commande-client/commande-client.component';

export const routes: Routes = [
  {
    path: 'visiteur',
    component: VisiteurComponent,
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
  /*{
    path: 'products/:id',
    component: ProductDetailComponent,
  },*/
  { path: 'register', component: RegisterComponent,},
  { path: 'login', component: LoginComponent},
  { path: 'admin/dashbord', component: AdminDashbaordComponent},
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'visiteur', component: VisiteurComponent },
  { path: 'home', component: HomeComponent },
  { path: 'product-card', component: ProductCardComponent },
  { path: 'admin/commmande', component: CommandeComponent },
  { path: 'admin/commmande/add', component: CommandeFormComponent },
  { path: 'admin/commande/:id', component: CommandeFormComponent },
  { path: 'client/commande', component: CommandeClientComponent }
  
];