import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

export interface UserData {
  email: string;
  name: string;
  lastName: string;

}
export interface UserAuthData {
  email: string;
  name?: string;
  lastName?: string;
  password: string
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

  private AUTH_URL = environment.API_AUTH_URL;
  private isLoggedInSubject: BehaviorSubject<boolean>;
  public isLoggedIn$: Observable<boolean>;
  private currentUserSubject = new BehaviorSubject<UserData | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
    this.isLoggedIn$ = this.isLoggedInSubject.asObservable();
    const user = this.getUser();
    if (user) {
      this.currentUserSubject.next(user);
    }

  }
  signIn(email: string, password: string): Observable<UserData> {
    return this.getUserAuth({ email, password }, 'login');


  }
  private getUserAuth(user: UserAuthData, url: string): Observable<UserData> {
    return this.http.post<JwtToken>(this.AUTH_URL + url, user)
      .pipe(switchMap(response => {
        const user = response.user;
        localStorage.setItem('jwt', response.access_token);
        localStorage.setItem('user', JSON.stringify(user));
        this.isLoggedInSubject.next(true);
        this.currentUserSubject.next(user)
        return of(user);

      }));
  }

  signUp(name: string, email: string, password: string): Observable<UserData> {
    return this.getUserAuth({ email, password, name }, 'register');
  }
  isUserLogin(): boolean {
    return this.hasToken();
  }
  logOut(): void {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.isLoggedInSubject.next(false);
  }
  private hasToken(): boolean {
    return Boolean(window.localStorage.getItem('jwt'));
  }
  public getToken(): string | null {
    return window.localStorage.getItem('jwt') ?? null;
  }
  public getUser(): UserData | null {
    const user = window.localStorage.getItem('user') ?? null;
    if (!user) {
      return null;
    }
    return JSON.parse(user);
  }
}
