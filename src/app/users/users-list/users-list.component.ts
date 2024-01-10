import { Component } from '@angular/core';


interface User {
  name: string;
  lastName: string;
  email: string;
  fiscalCode: string;
  phone: string;
  province: string;
}
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent {

  users: User[] = [
  ];
  trackUser(index: number, user: User): string {
    return user.email;
  }


}
