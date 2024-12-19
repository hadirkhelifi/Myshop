import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { Commande } from '../../types/commande';
import { CommandeService } from '../../services/commande.service';
import { AdminDashbaordComponent } from "../manage/admin-dashbaord/admin-dashbaord.component";

@Component({
  selector: 'app-commande',
  imports: [MatFormFieldModule, MatInputModule,
    MatTableModule, MatSortModule,
    MatPaginatorModule,
    MatButtonModule, RouterLink, HeaderComponent, AdminDashbaordComponent],
  templateUrl: './commande.component.html',
  styleUrl: './commande.component.scss'
})
export class CommandeComponent  {
  displayedColumns: string[] = ['id', 'name_user', 'name_produit', 'date', 'qantite', 'mgs', 'action'];
  dataSource: MatTableDataSource<Commande>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  commandeService = inject(CommandeService);

  constructor() {
    this.dataSource = new MatTableDataSource([] as Commande[]);
  }

  ngOnInit() {
    this.getServerData();
  }

  private getServerData() {
    this.commandeService.getCommandes().subscribe((result: any) => {
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

  delete(id: string) {
    console.log(id);
    this.commandeService.deleteCommandeById(id).subscribe(() => {
      alert("Commande supprimée.");
      this.getServerData();
    });
  }

}
