import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User, UserService } from '../user.service';


@Component({
  providers: [UserService],
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit {

  @Input() users: User[] = [];
  @Output() userDeleted = new EventEmitter<User>();
  @Output() userToBeUpdated = new EventEmitter<User>();
  trackUser(index: number, user: User): string {
    return user.email;
  }

  ngOnInit(): void {
    console.log('View initialized');

  }

  deleteUser(user: User): void {
    this.userDeleted.emit(user);

  }
  updateUser(user: User): void {
    this.userToBeUpdated.emit(user);
  }

}
