import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from "../../header/header.component";

@Component({
  selector: 'app-admin-dashbaord',
  imports: [MatButtonModule, RouterLink, HeaderComponent],
  templateUrl: './admin-dashbaord.component.html',
  styleUrl: './admin-dashbaord.component.scss'
})
export class AdminDashbaordComponent {

}
