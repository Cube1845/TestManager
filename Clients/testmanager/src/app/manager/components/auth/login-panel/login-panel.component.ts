import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { UserEmailSingletonService } from '../../../services/singletons/user-email-singleton.service';
import { ToasterService } from '../../../../common/services/toaster/toaster.service';

@Component({
  selector: 'app-login-panel',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-panel.component.html',
  styleUrl: './login-panel.component.scss',
})
export class LoginPanelComponent {
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly toasterService: ToasterService,
    private readonly emailSingleton: UserEmailSingletonService
  ) {}

  loginFormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  loginUser(): void {
    var email = this.loginFormGroup.controls.email.value!;
    var password = this.loginFormGroup.controls.password.value!;

    this.authService.loginUser(email, password).subscribe((response) => {
      this.router.navigateByUrl('home');
      this.toasterService.displaySuccess('Zalogowano', 5000);
      this.emailSingleton.setUserEmail(email);
    });
  }
}
