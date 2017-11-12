import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtectedComponent } from './protected.component';
import { AuthService } from '../../providers/auth.service';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router/src/router_module';
import { Router } from '@angular/router/src/router';

describe('ProtectedComponent', () => {
  let component: ProtectedComponent;
  let fixture: ComponentFixture<ProtectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProtectedComponent ],
      imports: [ HttpModule, RouterTestingModule, ToastrModule.forRoot() ],
      providers: [ AuthService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // const mockService = fixture.debugElement.injector.get(AuthService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should logout the user', () => {
    const mockService = fixture.debugElement.injector.get(AuthService);

    mockService.token = 'asdsadasd';
    mockService.logged = true;

    component.logout();

    expect(mockService.token).toBeNull();

  });
});
