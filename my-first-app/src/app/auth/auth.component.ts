import { Component, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponsePayload, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: any = '';
  @ViewChild(PlaceholderDirective) alertHost!: PlaceholderDirective;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

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
        this.router.navigate(['/recipes']);
      },
      (error) => {
        this.isLoading = false;
        this.error = error;
        this.showErrorAlert(error);
        console.log(this.error);
      }
    );

    loginFormData.reset();
  }

  onHandleError() {
    this.error = null;
  }

  private showErrorAlert(message: string) {
    const alertComponentFactory =
      this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    hostViewContainerRef.createComponent(alertComponentFactory);
  }
}
