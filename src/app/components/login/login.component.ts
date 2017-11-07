import { Http, Response } from '@angular/http';
import { AuthService } from '../../providers/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private auth: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      'email': ['', [Validators.required, Validators.maxLength(250), Validators.email]],
      'password': ['', [Validators.required, Validators.minLength(6), Validators.maxLength(250)]],
    });
  }

  ngOnInit() {
  }

  login () {
    const user = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    this.auth.login(user).subscribe();
  }
}
