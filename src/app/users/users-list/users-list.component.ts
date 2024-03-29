import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { User, UserService } from '../user.service';
import { Router } from '@angular/router';
import { Observable, Subscription, of } from 'rxjs';


@Component({
  providers: [],
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit {

  users$: Observable<User[]> = of([]);
  loadUsers: Subscription;

  constructor(private userService: UserService, private router: Router) {

    this.loadUsers = this.userService.usersSubject.subscribe(res => {
      if (res) {
        this.users$ = this.userService.getUsers();
      }
    })
  }



  trackUser(index: number, user: User): string {
    return user.email;
  }

  ngOnInit(): void {


  }

  deleteUser(user: User): void {
    this.userService.userDeleted.next(user);

  }
  updateUser(user: User): void {
    this.router.navigate(['users', user.id]);
  }

}
