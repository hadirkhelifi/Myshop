import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [MatInputModule,MatButtonModule, ReactiveFormsModule,FormsModule,RouterModule],

})
export class LoginComponent {

  email: string ='';
  password: string ='';

  constructor( private userService: AuthService,
               private router : Router,
               private cookieService: CookieService 
              ) {}


  loginUser(){
    this.userService.loginUser(this.email, this.password).subscribe(
      (response) => {
        console.log(response);
        // localStorage.setItem('userId', response.userId);
        // localStorage.setItem('userPhoto', response.userPhoto);

        const token = response.token;
        const role = response.role; 
        const username = response.username; 
console.log(response)
        if (token) {
          // Stockage sécurisé du cookie
          localStorage.setItem('username', username);
          const cookieExpirationDays = 1;
          this.cookieService.set('token', token, cookieExpirationDays, '/', '', true, 'Strict');
          this.cookieService.set('role', role, cookieExpirationDays, '/', '', true, 'Strict');

          alert("Bienvenue");
          // Vérifiez le token avant de naviguer
          if (this.userService.isTokenValid(token)) {
           
    if (this.userService.isAdmin()) {
      this.router.navigate(['admin/dashbord']); // Redirection admin
    } else  {
      this.router.navigate(['home']); // Redirection client
    }
          } else {
            alert("Token invalide, veuillez réessayer.");
          }
        } else {
          alert("Token manquant dans la réponse.");
        }
      },
      (error) => {
        console.error('Error during login:', error);
      }
    );
  }
}