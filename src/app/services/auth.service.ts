import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

export interface UserData {
  email: string;
  name: string;
  lastName: string;
}
export interface JwtToken {
  access_token: string;
  expires_in: number;
  user: UserData;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token = '1234assssssss';
  private AUTH_URL = environment.API_AUTH_URL;
  private isLoggedInSubject: BehaviorSubject<boolean>;
  public isLoggedIn$: Observable<boolean>;

  constructor(private http: HttpClient) {
    this.isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
    this.isLoggedIn$ = this.isLoggedInSubject.asObservable();
  }
  signIn(email: string, password: string): Observable<UserData> {
    return this.http.post<JwtToken>(this.AUTH_URL + 'login', { email, password })
      .pipe(switchMap(response => {
        localStorage.setItem('jwt', response.access_token);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.isLoggedInSubject.next(true);
        return of(response.user);

      }));


  }
  signUp(username: string, email: string, password: string): void {
    localStorage.setItem('jwt', this.token);
    this.isLoggedInSubject.next(true);
  }
  isUserLogin(): boolean {
    return this.hasToken();
  }
  logOut(): void {
    localStorage.removeItem('jwt');
    this.isLoggedInSubject.next(false);
  }
  private hasToken(): boolean {
    return Boolean(window.localStorage.getItem('jwt'));
  }
  public getToken(): string | null {
    return window.localStorage.getItem('jwt') ?? null;
  }
}
