import { Component, inject } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { product } from '../../types/product';
import { HeaderComponent } from "../header/header.component";
import { WishlistService } from '../../services/wishlist.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-product-detail',
  imports: [HeaderComponent,MatIconModule,RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {
  customerServices=inject(CustomerService);
  route=inject(ActivatedRoute);
  product!:product;
  ngOnInit(){
    const id= this.route.snapshot.params["id"];
    this.customerServices.getProductById(id).subscribe((result)=> {
      this.product = result;
      console.log(this.product)

    })
  }
  get sellingPrice(){
    const discount = this.product?.discount ?? 0;
    return Math.round(this.product.price - (this.product.price * discount) / 100);
    }
    wishlistService =inject(WishlistService);

    addToWishList(product:product){
      console.log(product);
      if(this.isInWishlist(product)){
        this.wishlistService.removeFromWishlists(product._id!)
        .subscribe((result)=>{
          this.wishlistService.init();
        })
      }else{
        this.wishlistService
        .addWishlist(product._id!)
        .subscribe((result)=>{
          this.wishlistService.init();
        }) 
      }
    }
  
    isInWishlist(product:product){
      let isExits = this.wishlistService.wishlists.find(
        (x) => x._id == product._id 
  
      );
      if (isExits) return true;
      else return false;   
    }
  
  
  

}
