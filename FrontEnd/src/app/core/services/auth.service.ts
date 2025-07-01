import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';



@Injectable({ providedIn: 'root' })
export class AuthService {
  loginToken?: string;
  role?: string;

  constructor(private http: HttpClient) {}

  login(email: string, pass: string) {
    return this.http.post<{ token: string, role: string }>(
      '/api/auth/login', { email, pass }
    ).pipe(tap(res => {
      this.loginToken = res.token;
      this.role = res.role;
      localStorage.setItem('token', res.token);
      localStorage.setItem('role', res.role);
    }));
  }

  logout() {
    this.loginToken = undefined;
    this.role = undefined;
    localStorage.clear();
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  isAdmin(): boolean {
    return this.isLoggedIn() && localStorage.getItem('role') === 'admin';
  }
}
