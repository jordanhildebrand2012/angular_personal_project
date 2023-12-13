import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string = '';

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
      this.isLoading = true;

      this.authService.signUp(email, password).subscribe(
        (responseData) => {
          this.isLoading = false;
          console.log(responseData);
        },
        (error) => {
          this.isLoading = false;
          this.error = error;
          console.log(this.error);
        }
      );
    }
    loginFormData.reset();
  }
}
