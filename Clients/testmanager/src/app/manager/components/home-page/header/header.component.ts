import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { UserEmailSingletonService } from '../../../services/singletons/user-email-singleton.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnDestroy {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly emailSingleton: UserEmailSingletonService
  ) {}

  ngOnDestroy(): void {
    this.emailSingleton.setUserEmail(null);
  }

  signOut(): void {
    this.authService.signUserOut();
    this.router.navigateByUrl('login');
  }

  getEmail(): string {
    return this.emailSingleton.getUserEmail()!;
  }
}
