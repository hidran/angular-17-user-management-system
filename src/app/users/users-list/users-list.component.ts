import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { User, UserService } from '../user.service';
import { Router } from '@angular/router';


@Component({
  providers: [UserService],
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit {

  users: User[] = [];


  constructor(private userService: UserService, private router: Router) {

  }
  @Output() userDeleted = new EventEmitter<User>();


  trackUser(index: number, user: User): string {
    return user.email;
  }

  ngOnInit(): void {
    this.users = this.userService.getUsers();

  }

  deleteUser(user: User): void {
    this.userDeleted.emit(user);

  }
  updateUser(user: User): void {
    this.router.navigate(['users', user.id]);
  }

}
