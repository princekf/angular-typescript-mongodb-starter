import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserS } from '@atme/entity/User';
import { LoginSignupService } from '@atmeservices/login-signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: [ './signup.component.scss' ]
})
export class SignupComponent {

  user: UserS ={
    name: '',
    email: '',
    password: ''
  }

  errorMessage = '';

  loading = false;

  emailChange = true;

  emailRegEx = /^(?<name>[a-zA-Z0-9_\-\.]+)@(?<domain>[a-zA-Z0-9_\-\.]+)\.(?<extn>[a-zA-Z]{2,5})$/ugm;

  errorMsg = {
    name: '',
    email: '',
    password: '',
    confPassword: ''
  }

  password = '';

  confPassword = '';

  constructor(private readonly loginSignupService:LoginSignupService,
    private readonly router:Router) {}

  register(): void {

    if (this.checkValid()) {

      this.loading = true;
      this.loginSignupService.signUp(this.user).subscribe((message) => {

        this.loading = false;
        this.router.navigateByUrl('/');

      }, (error) => {

        this.loading = false;
        console.error(error);
        if (error.error.message === 'Email id already exists.') {

          this.errorMsg.email = 'Email id already exists!';

        } else {

          this.errorMessage = error.error.message;

        }

      });

    }

  }

  emailCheck(): void {

    this.errorMessage = '';
    this.emailChange = false;
    this.errorMsg.email = '';
    if (!this.emailRegEx.test(this.user.email)) {

      this.emailChange = true;
      this.errorMsg.email = 'Invalid Email!';

    }

  }

  nameCheck(): void {

    this.errorMessage = '';
    this.errorMsg.name = '';
    if (this.user.name === '') {

      this.errorMsg.name = 'Name should not be empty!';

    }

  }

  passwordCheck(): void {

    this.errorMessage = '';
    this.errorMsg.password = '';
    this.user.password = '';
    if (this.password === '') {

      this.errorMsg.password = 'Password should not be empty!';

    } else if (this.confPassword !== '') {

      this.passwordSameCheck();

    }


  }

  passwordSameCheck(): void {

    this.errorMsg.password = '';
    if (this.password !== this.confPassword) {

      this.errorMsg.password = 'Password should be same!';

    } else {

      this.user.password = this.confPassword;

    }

  }

  confPasswordCheck(): void {

    this.errorMessage = '';
    this.errorMsg.confPassword = '';
    this.user.password = '';
    if (this.confPassword === '') {

      this.errorMsg.confPassword = 'Password should not be empty!';

    } else if (this.password !== '') {

      this.passwordSameCheck();

    }

  }

  checkValid(): boolean {

    this.reset();
    const mailcheck = !this.emailRegEx.test(this.user.email);
    if (this.user.name === '') {

      this.errorMsg.name = 'Name should not be empty!';
      return false;

    }
    this.errorMsg.name = '';
    if (mailcheck && this.emailChange) {

      this.errorMsg.email = 'Invalid Email!';
      return false;

    }
    this.errorMsg.email = '';
    if (this.password === '') {

      this.errorMsg.password = 'Password should not be empty!';
      return false;

    } else if (this.confPassword === '') {

      this.errorMsg.confPassword = 'Password should not be empty!';
      return false;

    } else if (this.password !== this.confPassword) {

      this.errorMsg.password = 'Password should be same!';
      return false;

    }
    this.errorMsg.password = '';
    this.user.password = this.confPassword;
    return true;

  }

  reset(): void {

    this.errorMessage = '';
    this.errorMsg = {
      name: '',
      email: '',
      password: '',
      confPassword: ''
    };

  }

}
