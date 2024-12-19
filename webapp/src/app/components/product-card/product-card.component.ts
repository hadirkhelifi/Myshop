import { Component, inject, Input } from '@angular/core';
import { product } from '../../types/product';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon'
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-product-card',
  imports: [MatButtonModule,RouterLink,MatIconModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product!:product;
   wishlistService=inject(WishlistService);

  get sellingPrice(){
    const discount = this.product?.discount ?? 0;
    return Math.round(this.product.price - (this.product.price * discount) / 100);
  }

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
