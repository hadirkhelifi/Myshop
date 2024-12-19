import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProductService } from '../../../services/product.service'; // Assurez-vous que le service est correct
import { product } from '../../../types/product'; // Assurez-vous que le type 'Product' existe
import { inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from "../../header/header.component";
import { AdminDashbaordComponent } from "../admin-dashbaord/admin-dashbaord.component";

@Component({
  selector: 'app-products',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    RouterLink,
    HeaderComponent,
    AdminDashbaordComponent
],
  templateUrl: './produts.component.html',
  styleUrls: ['./produts.component.scss']
})
export class ProductComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'shortDescription', 'price', 'discount', 'action'];
  dataSource: MatTableDataSource<product>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  productService = inject(ProductService);

  constructor() {
    this.dataSource = new MatTableDataSource<product>([]);
    console.log("ssss"+this.dataSource) // Initialisation avec un tableau vide de type Product
  }

  ngOnInit(): void {
    this.getServerData();
  }

  private getServerData() {
    this.productService.getAllProducts().subscribe((result: any) => {
      console.log("API Response:", result);
      this.dataSource.data = result.map((product: any) => ({
        id: product._id, // Si l'ID s'appelle `productId` dans l'API
        name: product.name,
        price: product.price,
        shortDescription: product.shortDescription,
        discount: product.discount,
      }));
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage(); // Retour à la première page après filtrage
    }
  }
    /*delete(id:string){
      console.log(id);
      this.productService.deleteProductById(id).subscribe((result:any)=>{
        alert("Product deleted !!! ");
        this.getServerData();
      })
    }*/
      deleteProduct(id: string): void {
        if (!id) {
            console.error('No product ID provided for deletion');
            return;
        }
    
        console.log("Deleting product with ID:", id); // Vérifiez que l'ID est correctement affiché
    
        this.productService.deleteProductById(id).subscribe({
            next: () => {
                alert('Product deleted successfully.');
                this.getServerData();// Rafraîchir la liste des produits après suppression
            },
            error: (err) => {
                console.error('Error deleting product:', err);
            }
        });
    }
    

}
