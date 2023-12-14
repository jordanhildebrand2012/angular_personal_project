import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, catchError, pipe, throwError, tap } from 'rxjs';
import { UserModel } from './user.model';

export interface AuthResponsePayload {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new Subject<UserModel>();

  constructor(private http: HttpClient) {}

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponsePayload>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDiUc5MPdu33J6W7aMnf11d9uWcGSGXagk',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleErrors),
        tap((responseData) => {
          this.handleUserAuthentication(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            +responseData.expiresIn
          );
        })
      );
  }

  loginUser(email: string, password: string) {
    return this.http
      .post<AuthResponsePayload>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDiUc5MPdu33J6W7aMnf11d9uWcGSGXagk',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleErrors),
        tap((responseData) => {
          this.handleUserAuthentication(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            +responseData.expiresIn
          );
        })
      );
  }

  private handleUserAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new UserModel(email, userId, token, expirationDate);
    this.user.next(user);
  }

  private handleErrors(returnedError: HttpErrorResponse) {
    let errorMessage = 'An Unknown error has occured, we will investigate ASAP';
    if (!returnedError.error || !returnedError.error.error) {
      return throwError(errorMessage);
    }
    switch (returnedError.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage =
          'The email address is already in use by another account.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage =
          'There is no user record corresponding to this identifier. The user may have been deleted.';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage =
          'The password is invalid or the user does not have a password.';
        break;
      case 'USER_DISABLED':
        errorMessage =
          'The user account has been disabled by an administrator.';
        break;
    }
    return throwError(errorMessage);
  }
}
