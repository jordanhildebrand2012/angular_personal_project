import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, pipe, throwError } from 'rxjs';

interface AuthResponsePayload {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
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
        catchError((retrunedError) => {
          let errorMessage =
            'An Unknown error has occured, we will investigate ASAP';
          if (!retrunedError.error || !retrunedError.error.error) {
            return throwError(errorMessage);
          }
          switch (retrunedError.error.error.message) {
            case 'EMAIL_EXISTS':
              errorMessage =
                'The email address is already in use by another account.';
              break;
          }
          return throwError(errorMessage);
        })
      );
  }
}
