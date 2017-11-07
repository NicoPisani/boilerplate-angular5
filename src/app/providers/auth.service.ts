import { environment } from '../../environments/environment';
import { Injectable, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import { ActivatedRoute, Router } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/share';
import { ToastrService } from 'ngx-toastr';


@Injectable()

export class AuthService {
  token: string;
  logged = false;

  constructor(
    private http: Http,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
  ) {
  }

  register (user: Object): Observable<Response> {
    return this.http.post(`${ environment.url }register-comprador`, user)
    .map((response: Response) => {
      if (response.json() && response.json().error === false) {
        return response.json();
      } else {
        this.toastr.error(response.json().message, 'Error');
        return console.error(response);
      }
    });
  }


  login (user: Object): Observable<any> {
    return this.http.post(`${ environment.url }login`, user)
      .map((response: Response) => {
        console.log(response.json());

        // Si hay algun problema en la autenticacion...
        if (response.json().error) {
          this.toastr.error(response.json().message, 'Error');
          return console.log(response.json());
        }
        const token = response.json().token;

        console.log('Response token:' + token);

        if (token) {
          this.toastr.success('Login correcto', 'Éxito');
          this.token = token;
          this.logged = true;
          localStorage.setItem('token', JSON.stringify(this.token));
          return true;
        } else {
          return false;
        }

      })
      .catch((error: any) => Observable.throw(error.json().error || {message: 'Server Error'}));
  }

  loggedIn() {
    return tokenNotExpired();
  }

  logout(): void {
    this.token = null;
    this.logged = false;
    localStorage.removeItem('token');
    console.log('you are logged out!');
    this.router.navigate(['/']);
  }

}
