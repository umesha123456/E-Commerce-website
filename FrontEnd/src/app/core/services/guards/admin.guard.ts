import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../../../auth.service'; // <-- Correct import

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  
  canActivate(): boolean | UrlTree {
    return this.auth.isAdmin() || this.router.parseUrl('/');
  }
  
}
