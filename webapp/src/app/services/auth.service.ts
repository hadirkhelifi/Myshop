import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { User } from '../types/user';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl: string = 'http://localhost:3000/auth';

  constructor(private http: HttpClient,private cookieService: CookieService) { }

  registerUser(userData: any): Observable<any> {
    return this.http.post('http://localhost:3000/auth/register', userData, {
      headers: {
        'Content-Type': 'application/json'  // Ajoutez ce header si l'API attend du JSON
      }
    });
 
  }
  
  loginUser(email: string, password: string): Observable<any> {
    const url = 'http://localhost:3000/auth/login-user';
    const body = { email: email, password: password };
  
    return this.http.post<any>(url, body).pipe(
      catchError((error) => {
        console.error('Error during login:', error);
        return throwError('Login failed. Please try again.'); // Personnaliser message d'erreur
      }),
      // Après une connexion réussie, stocker les informations de l'utilisateur
      tap((response) => {
        localStorage.setItem('token', response.token); // Stocker le token
        localStorage.setItem('user', JSON.stringify(response.user)); // Stocker les informations de l'utilisateur
      })
    );
  }
  

  getUsers(): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/all`);
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${userId}`);
  }


  getUserById(userId: string):Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`);
  }


  updateUser(userId:string, userData:any): Observable<any>{
    return this.http.put<User>(`${this.apiUrl}/${userId}`, userData);
  }

  isTokenValid(token: string): boolean{
    return !!token;
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong. Please try again later.');
  }

  isAdmin(): boolean {
    const role = this.cookieService.get('role');
    if (role=== 'admin') {
      return true;
    }
    return false;
  }

  get isLoggedIn(){
    let token = localStorage.getItem('token');
    if (token){
      return true;
    }
    return false;
    
  }
  
  get userName() {
    let userData = localStorage.getItem('user');
    if (userData) {
      try {
        return JSON.parse(userData).name;
      } catch (error) {
        console.error('Error parsing user data:', error);
        return null;
      }
    }
    return null;
  }

}
function jwt_decode(token: string): any {
  throw new Error('Function not implemented.');
}



