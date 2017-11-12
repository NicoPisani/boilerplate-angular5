import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/from';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../providers/auth.service';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';

class ActivatedRouteStub {
  params: Observable<any> = Observable.empty();
}

class RouterStub {
  navigate(params) {
  }
}


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [FormsModule, ReactiveFormsModule, HttpModule, RouterTestingModule, ToastrModule.forRoot() ],
      providers: [ AuthService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the authservice.login function', () => {
    const array = [1, 2, 3];
    const mockService = fixture.debugElement.injector.get(AuthService);

    const spy = spyOn(mockService, 'login').and.returnValue(Observable.from( [ array ]));
    component.login();

    expect(mockService.login).toHaveBeenCalled();
  });
});
