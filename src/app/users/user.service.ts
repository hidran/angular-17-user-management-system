import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';
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
  //private http2 = inject(HttpClient)
  users: User[] = [
  ];
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
  getUser(id: number): Observable<User | null> {
    return this.http.get<User>(this.apiUrl + '/' + id);
  }
  constructor(private http: HttpClient) {
    console.log('user service created')
  }
  deleteUser(user: User): void {

    const idx = this.users.findIndex(ele => ele.id === user.id);

    this.users.splice(idx, 1);

  }
  updateUser(user: User): boolean {

    const idx = this.users.findIndex(ele => ele.id === user.id);

    if (idx === -1) {
      return false;
    }
    this.users[idx] = { ...user };

    return true;
  }
  createUser(user: User): boolean {

    const idx = this.users.findIndex(ele => ele.email === user.email);

    if (idx !== -1) {
      return false;
    }
    user.id = this.users.length + 1;
    this.users.push(user);

    return true;
  }
}

