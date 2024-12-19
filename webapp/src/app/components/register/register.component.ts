import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [MatInputModule,MatButtonModule, ReactiveFormsModule,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  formbuilder = inject(FormBuilder);
  registerForm = this.formbuilder.group({
    name: ['', [Validators.required]], 
    email: ['', [Validators.required, Validators.email]], 
    password: ['', [Validators.minLength(5)]], 
  }); 

  user: any = {};

  constructor(private userService: AuthService, private router: Router) {}

  register() {
    const userData = {
      username: this.user.username,
      email: this.user.email,
      password: this.user.password,
      role: this.user.role
    };

    this.userService.registerUser(userData).subscribe(
      (response) => {
        console.log(response);
        alert('Inscription réussie:');
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Erreur lors de l\'inscription:', error);
        // Affichez un message d'erreur à l'utilisateur si besoin
      }
    );
}
}
