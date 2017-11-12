import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { AuthService } from '../../providers/auth.service';
import { RequestsService } from '../../requests.service';
import { By } from '@angular/platform-browser';
// import { By } from 'protractor';
// import { By } from '@angular/platform-browser/src/dom/debug/by';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [FormsModule, ReactiveFormsModule, HttpModule, RouterTestingModule, ToastrModule.forRoot()],
      providers: [AuthService, RequestsService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the register method on AuthService', () => {

    fixture.whenStable().then(() => {

      const mockService = fixture.debugElement.injector.get(AuthService);

      const inputEmail = fixture.debugElement.query(By.css('#input-email'));
      const emailElement = inputEmail.nativeElement;
      emailElement.value = 'test@test.com';

      const nombreInput = fixture.debugElement.query(By.css('#input-nombre'));
      const nombreElement = nombreInput.nativeElement;
      nombreElement.value = 'usuario de prueba';

      const password1Input = fixture.debugElement.query(By.css('#input-password1'));
      const password1Element = password1Input.nativeElement;
      password1Element.value = '12345678';

      const password2Input = fixture.debugElement.query(By.css('#input-password2'));
      const password2Element = password2Input.nativeElement;
      password2Element.value = '12345678';

      const spy = spyOn(mockService, 'register').and.returnValue(true);

      const user = {
        email: emailElement.value,
        password: password1Element.value,
        nombre: nombreElement.value,
        password_confirmation: password2Element.value,
      };

      component.register();

      expect(spy).toHaveBeenCalledWith(user);
    });

  });
});
