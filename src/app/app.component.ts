import { Component, inject } from '@angular/core';
import { User, UserService } from './users/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'

})
export class AppComponent {

  title = 'ums';
  userService = inject(UserService);
  users = this.userService.getUsers();

  onDeleteUser(user: User): void {
    this.userService.deleteUser(user);
    this.users = this.userService.getUsers();
  }
  showUserForm(user: User): void {
    alert(user.email)

  }
}
