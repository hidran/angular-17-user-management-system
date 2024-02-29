import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  public isLoggedIn$: Observable<boolean>
  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedIn$ = authService.isLoggedIn$
  }
  login(): void {
    this.router.navigate(['/login']);
  }
  logout() {
    this.authService.logOut();
    this.router.navigate(['/'])
  }
  signup() {
    this.router.navigate(['/signup']);
  }
}
