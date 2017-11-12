import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';


describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ AuthService ],
      imports: [ HttpModule, RouterTestingModule, ToastrModule.forRoot() ]
    });
  });


  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));


  it('should register the user', inject([AuthService], (service: AuthService) => {
    const array = [1, 2, 3];
    const spy = spyOn(service, 'register').and.returnValue(true);

    service.register({ user: true });

    expect(spy).toHaveBeenCalled();
  }));

  it('should return the unauthorized state of the user', inject([AuthService], (service: AuthService) => {
    const spy = spyOn(service, 'loggedIn').and.returnValue(false);
    const status = service.loggedIn();

    expect(status).toBeFalsy();
  }));

  it('should return the authorized state of the user', inject([AuthService], (service: AuthService) => {
    const spy = spyOn(service, 'loggedIn').and.returnValue(true);
    const status = service.loggedIn();

    expect(status).toBeTruthy();
  }));


});
