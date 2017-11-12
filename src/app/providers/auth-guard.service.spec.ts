import { TestBed, inject } from '@angular/core/testing';

import { AuthGuardService } from './auth-guard.service';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './auth.service';
import { HttpModule } from '@angular/http';
import { ToastrService, ToastrModule } from 'ngx-toastr';

describe('AuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardService, AuthService, ToastrService ],
      imports: [RouterTestingModule, HttpModule, ToastrModule.forRoot() ]
    });
  });

  it('should be created', inject([AuthGuardService], (service: AuthGuardService) => {
    expect(service).toBeTruthy();
  }));

  it('should allow the authenticated user to access the page',
    inject([AuthService, AuthGuardService], (authService: AuthService, authGuardService: AuthGuardService) => {

    const authServiceLoggedIn = spyOn(authService, 'loggedIn').and.returnValue(true);

    const result = authGuardService.canActivate();

    expect(result).toBeTruthy();

  }));

  it('should NOT allow the unauthenticated user to access the page',
    inject([AuthService, AuthGuardService], (authService: AuthService, authGuardService: AuthGuardService) => {

    const authServiceLoggedIn = spyOn(authService, 'loggedIn').and.returnValue(false);

    const result = authGuardService.canActivate();

    expect(result).toBeFalsy();

  }));

});
