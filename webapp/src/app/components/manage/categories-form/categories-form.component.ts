import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CategoryService } from '../../../services/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import {MatSelectModule} from '@angular/material/select';
import { HeaderComponent } from "../../header/header.component";
import { AdminDashbaordComponent } from "../admin-dashbaord/admin-dashbaord.component";

@Component({
  selector: 'app-categories-form',
  standalone: true, // Ajoutez cette ligne si vous utilisez Angular 14+
  imports: [FormsModule, MatInputModule, MatButtonModule, MatSelectModule, HeaderComponent, AdminDashbaordComponent],
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss'] // Corrigé de styleUrl à styleUrls
})
export class CategoriesFormComponent implements OnInit {
  name!: string; 
   categoryService = inject(CategoryService);
   router = inject(Router);
   route = inject(ActivatedRoute);
  isEdit = false;
  id!:string;
  

  ngOnInit(){
    this.id = this.route.snapshot.params['id']; 
    if(this.id){
      this.isEdit=true;
      this.categoryService.getCategoryById(this.id).subscribe((result: any) => {
        console.log(result);
        this.name=result.name;
      })
    }
  } 

  add(){
    console.log(this.name);
    this.categoryService.addCategory(this.name).subscribe((result: any) => {
      alert("Category added");
      this.router.navigateByUrl("/admin/categories");
    });
  }
  update(){
    console.log(this.name);
    this.categoryService.updateCategory(this.id,this.name).subscribe((result: any) => {
      alert("Category updated");
      this.router.navigateByUrl("/admin/categories");
    });

  }
}