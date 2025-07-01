import { Component } from '@angular/core';
import { AuthService } from '../core/services/auth.service'; // Adjust path if needed

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
})
export class AdminComponent {
  constructor(private auth: AuthService) {}

  logout() {
    this.auth.logout();
  }
}
