import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private readonly authService: AuthService, private readonly router: Router) {}

  signOut(): void {
    this.authService.signUserOut();
    this.router.navigateByUrl('login');
  }
}
