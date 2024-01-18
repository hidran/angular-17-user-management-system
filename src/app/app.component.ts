import { Component, inject } from '@angular/core';
import { User, UserService } from './users/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'

})
export class AppComponent {
  userCols = 12;
  formCol = 0;
  title = 'User Management System';
  selectedUser: User | null = null;
  userService = inject(UserService);
  users = this.userService.getUsers();

  onDeleteUser(user: User): void {
    this.userService.deleteUser(user);
    this.users = this.userService.getUsers();
  }
  showUserForm(user: User): void {
    this.selectedUser = { ...user };// Object.assign({}, user)
    this.userCols = 8;
    this.formCol = 4;
  }
}
