import { AuthService } from './providers/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Conseguilo Online';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public auth: AuthService
  ) {}
}
