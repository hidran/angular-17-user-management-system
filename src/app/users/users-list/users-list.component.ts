import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { User, UserService } from '../user.service';


@Component({
  providers: [UserService],
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit {

  users: User[] = [];

  userService = inject(UserService);

  @Output() userDeleted = new EventEmitter<User>();
  @Output() userToBeUpdated = new EventEmitter<User>();

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
    this.userToBeUpdated.emit(user);
  }

}
