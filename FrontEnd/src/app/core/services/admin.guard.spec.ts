import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import { AuthService } from '../services/auth.service'; // Adjust path

describe('AdminGuard', () => {
  let guard: AdminGuard;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

 beforeEach(() => {
  const authSpy = jasmine.createSpyObj('AuthService', ['isAdmin']);
  const routerMock = jasmine.createSpyObj('Router', ['parseUrl']);

  TestBed.configureTestingModule({
    providers: [
      AdminGuard,
      { provide: AuthService, useValue: authSpy },
      { provide: Router, useValue: routerMock }
    ]
  });

  guard = TestBed.inject(AdminGuard);
  authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

  // ✅ Correctly mock parseUrl to return a UrlTree
  routerSpy.parseUrl.and.returnValue(TestBed.inject(Router).createUrlTree(['/']));
});

});