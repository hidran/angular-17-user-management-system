import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { environment } from '../../environments/environment';
export interface User {
  id: number;
  name: string;
  lastName: string;
  email: string;
  fiscalCode: string;
  phone: string;
  province: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = environment.API_USER_URL;
  userUpdated = new Subject<User>();
  userCreated = new Subject<User>();
  userDeleted = new Subject<User>();

  public usersSubject = new BehaviorSubject<boolean>(false);

  users: User[] = [
  ];
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
  getUser(id: number): Observable<User | null> {
    return this.http.get<User>(this.apiUrl + '/' + id);
  }
  constructor(private http: HttpClient) {
    console.log('user service created');
    this.usersSubject.next(true);
  }
  deleteUser(user: User): Observable<void> {
    return this.http.delete<void>(this.apiUrl + '/' + user.id)
      .pipe(
        tap(res => {
          this.usersSubject.next(true);
        })
      );

  }
  updateUser(user: User): Observable<User> {

    return this.http.put<User>(this.apiUrl + '/' + user.id, user).pipe(
      tap(res => {
        this.usersSubject.next(true);
      })
    );;

  }
  createUser(user: User): Observable<User> {

    return this.http.post<User>(this.apiUrl, user).pipe(
      tap(res => {
        this.usersSubject.next(true);
      })
    );;

  }
}

