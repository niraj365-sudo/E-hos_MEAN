import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';
  private tokenKey = 'token';
  private userRole: string = '';
  

  constructor(private http: HttpClient) { }

  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user);
  }

  login(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, user);
  }

  getProfile(): Observable<any> {
    const headers = this.getHeadersWithToken();
    return this.http.get<any>(`${this.apiUrl}/profile`, { headers });
  }

  // getUserRole(): Observable<string> {
  //   const headers = this.getHeadersWithToken();
  //   return this.http.get<string>(`${this.apiUrl}/dashboard`, { headers });
  // }

  getUserRole(): Observable<string> {
    const headers = this.getHeadersWithToken();
    return this.http.get<string>(`${this.apiUrl}/dashboard`, { headers }).pipe(
      tap((role: string) => {
        this.userRole = role; // Store the user role in the service
        console.log(role);
        
      })
    );
  }

  getUserRoleValue(): string {
    return this.userRole;
  }
  

   private getHeadersWithToken(): HttpHeaders {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });
    return headers;
  }

  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string {
    return localStorage.getItem(this.tokenKey) || '';
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return token !== null && token !== '';
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
