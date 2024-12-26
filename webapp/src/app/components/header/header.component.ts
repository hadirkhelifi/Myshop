import { Component, inject } from '@angular/core';
import { Category } from '../../types/category';
import { CategoryService } from '../../services/category.service';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [RouterLink,FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  CategoryService = inject(CategoryService);
  categoryList: Category[] = [];
  authService = inject(AuthService);
  userName: string | null = null;  // Déclarez la propriété userName ici
  searchTerm!:string;

  ngOnInit() {
    this.CategoryService.getCategories().subscribe((result) => {
      this.categoryList = result;
    });
    this.userName = localStorage.getItem("username"); 
    console.log('User Name:', this.userName); 
  }

  router = inject(Router);

  onSearch(e: any) {
    if (e.target.value) {
      this.router.navigateByUrl("/products?search=" + e.target.value);
    }
  }

  searchCategory(id: string) {
    this.searchTerm="";
    this.router.navigateByUrl("/products?categoryId=" + id!);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');+
    localStorage.removeItem('username');
    this.router.navigateByUrl('/login');
  }
  isAdmin()
  {
    if (this.authService.isAdmin()) {
      return true;
    } else {
      return false;
    }
  }
}
