import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponsePayload, AuthService } from './auth.service';
import { Observable } from 'rxjs';

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
    const email = loginFormData.value.email;
    const password = loginFormData.value.password;

    let authObservable: Observable<AuthResponsePayload>;

    this.isLoading = true;
    if (this.isLoginMode) {
      authObservable = this.authService.loginUser(email, password);
    } else {
      authObservable = this.authService.signUp(email, password);
    }

    authObservable.subscribe(
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

    loginFormData.reset();
  }
}
