import { Component, OnInit } from '@angular/core';
import { User, UserService } from '../user.service';


@Component({
  providers: [UserService],
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit {

  users: User[] = [];
  trackUser(index: number, user: User): string {
    return user.email;
  }
  constructor(private userService: UserService) {
    console.log('constructor');

  }
  ngOnInit(): void {
    console.log('View initialized');
    this.users = this.userService.getUser();
  }



}
