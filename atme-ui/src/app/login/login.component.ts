import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginSignupService } from '@atmeservices/login-signup.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
})
export class LoginComponent {

  email = '';

  password = '';

  errorMessage = '';

  loading = false;

  constructor(private readonly loginSignupService:LoginSignupService,
    private readonly router:Router) {}

  login(): void {

    if (this.email !== '' && this.password !== '') {

      this.errorMessage = '';
      const user = {
        email: this.email,
        password: this.password
      };
      this.loading = true;
      this.loginSignupService.login(user).subscribe((message) => {

        this.loading = false;
        window.alert('success');

      }, (error) => {

        this.loading = false;
        this.errorMessage = error.error.message;
        console.error(error);

      });

    }

  }


}
