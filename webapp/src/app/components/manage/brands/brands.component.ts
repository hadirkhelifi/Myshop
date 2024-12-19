import { Component, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { BrandService } from '../../../services/brand.service';
import { Brand } from '../../../types/brand';
import { HeaderComponent } from "../../header/header.component";
import { AdminDashbaordComponent } from "../admin-dashbaord/admin-dashbaord.component";

@Component({
  selector: 'app-brands',
  imports: [MatFormFieldModule, MatInputModule,
    MatTableModule, MatSortModule,
    MatPaginatorModule,
    MatButtonModule, RouterLink, HeaderComponent, AdminDashbaordComponent],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {
  displayedColumns: string[] = ['id', 'name', 'action'];
  dataSource: MatTableDataSource<Brand>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  BrandService=inject(BrandService);
  constructor() {
    
    this.dataSource = new MatTableDataSource([] as any);
    
    
  }
  ngOnInit(){
    this.getServerData();
  }

  private getServerData() {
    this.BrandService.getBrands().subscribe((result: any) => {
      console.log(result);
      this.dataSource.data = result;

    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase(); 
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  delete(id:string){
    console.log(id);
    this.BrandService.deleteBrandsById(id).subscribe((result:any)=>{
      alert("Brand deleted .");
      this.getServerData();
    })


  }

}
