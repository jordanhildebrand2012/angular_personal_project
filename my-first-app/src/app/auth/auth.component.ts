import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  isLoginMode: boolean = true;

  constructor(private authService: AuthService) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmitLoginForm(loginFormData: NgForm) {
    if (!loginFormData.valid) {
      return;
    }
    if (this.isLoginMode) {
      //Do login logic
    } else {
      const email = loginFormData.value.email;
      const password = loginFormData.value.password;

      this.authService.signUp(email, password).subscribe(
        (responseData) => {
          console.log(responseData);
        },
        (error) => {
          console.log(error);
        }
      );
    }
    loginFormData.reset();
  }
}
