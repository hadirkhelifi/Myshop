import { Component, inject } from '@angular/core';
import { Category } from '../../types/category';
import { CategoryService } from '../../services/category.service';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-header',
  imports: [RouterLink],  // If you don't need to import other modules, you can remove this.
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']  // Use 'styleUrls' instead of 'styleUrl'
})
export class HeaderComponent {
  CategoryService = inject(CategoryService);
  categoryList: Category[]=[];
  ngOnInit(){
    this.CategoryService.getCategories().subscribe((result)=> {
      this.categoryList = result;
    })
  }
  router=inject(Router);
  onSearch(e:any){
    if(e.target.value){
      this.router.navigateByUrl("/products?search="+e.target.value)
    }
  }
  searchCategory(id:string){
    this.router.navigateByUrl("/products?categoryId="+id!)
  }
}
