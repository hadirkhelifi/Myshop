import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { BrandService } from '../../../services/brand.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from "../../header/header.component";
import { AdminDashbaordComponent } from "../admin-dashbaord/admin-dashbaord.component";

@Component({
  selector: 'app-brand-form',
  imports: [MatInputModule, MatButtonModule, FormsModule, HeaderComponent, AdminDashbaordComponent],
  templateUrl: './brand-form.component.html',
  styleUrl: './brand-form.component.scss'
})
export class BrandFormComponent {
  name!:string;
  brandsService=inject(BrandService)
  router=inject(Router);
  route=inject(ActivatedRoute);
  id!:string; 
 
  ngOnInit(){
     this.id=this.route.snapshot.params["id"];
     this.brandsService.getBrandsById(this.id).subscribe(result =>{
      this.name=result.name;
     })

  }
  add(){
    this.brandsService.addBrands(this.name).subscribe(result=>{
      alert("Brand Added");
      this.router.navigateByUrl("/admin/brands")
    }) 
  }
  update(){
    this.brandsService.updateBrands(this.id,this.name).subscribe(result=>{
      alert("Brand Updated");
      this.router.navigateByUrl("/admin/brands")
    }) 
  }
  

}
