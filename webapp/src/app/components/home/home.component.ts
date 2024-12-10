import { Component, inject } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { product } from '../../types/product';
import { MatButtonModule } from '@angular/material/button';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [MatButtonModule, ProductCardComponent, CarouselModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    nav: true
  }
  customerService=inject(CustomerService);
  newProducts:product[]=[];
  featuredProducts:product[]=[];
  bannerImages:product[]=[];
  ngOnInit(){
    this.customerService.getFeaturedProducts().subscribe(
      result=>{
        this.featuredProducts=result;
        console.log(this.featuredProducts);
        this.bannerImages.push(...result);
      });
    this.customerService.getNewProducts().subscribe(
      result=>{
        this.newProducts=result;
        console.log(this.newProducts);
        this.bannerImages.push(...result);
      });
    
  }

}