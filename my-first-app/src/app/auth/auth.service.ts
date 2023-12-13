import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
    return this.http.post<AuthResponsePayload>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDiUc5MPdu33J6W7aMnf11d9uWcGSGXagk',
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );
  }
}
