import { RequestsService } from '../../requests.service';
import { Http } from '@angular/http';
import { AuthService } from '../../providers/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  duplicate: boolean;
  registerForm: FormGroup;

  constructor(
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private http: Http,
    private requestService: RequestsService,
  ) {
    this.registerForm = this.formBuilder.group({
      'email': ['',
        [ Validators.required, Validators.maxLength(250), Validators.email ],
        [ this.checkTakenEmail.bind(this) ]
      ],
      'password': ['', [Validators.required, Validators.minLength(6), Validators.maxLength(250)]],
      'password_confirmation': ['', [Validators.required, Validators.minLength(6), Validators.maxLength(250)]],
      'nombre': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(250)]],
    }, {
      // Validation abstracta para ver si las contrasenas coinciden
      validator: this.checkMatchingPasswords('password', 'password_confirmation'),
    });
  }

  ngOnInit() {
  }

  register() {
    const user = {
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      nombre: this.registerForm.value.nombre,
      password_confirmation: this.registerForm.value.password_confirmation,
    };
    this.auth.register(user).subscribe();
  }

  private checkMatchingPasswords(password: string, password_confirmation: string) {
    return (group: FormGroup) => {
      const passwordInput = group.controls[password];
      const passwordConfirm = group.controls[password_confirmation];
      if (passwordInput.value !== passwordConfirm.value) {
        return passwordConfirm.setErrors({noCoinciden: true});
      } else {
        return passwordConfirm.setErrors(null);
      }
    };
  }

  private checkTakenEmail(control: FormControl): {[key: string]: any} {
    const resultado = this.requestService.checkForTakenEmail(control.value);
    resultado.then(response => {
      if (response && response['duplicate'] === true) {
        this.duplicate = true;
      } else if (response && response['duplicate'] === false) {
        this.duplicate = false;
      }
    });
    return resultado;
  }

}
