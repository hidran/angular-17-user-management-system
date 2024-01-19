import { Component, OnDestroy, inject } from '@angular/core';
import { User, UserService } from './users/user.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'

})
export class AppComponent implements OnDestroy {


  title = 'User Management System';
  userService = inject(UserService);
  userUpdatedSub: Subscription;
  userDeletedSub: Subscription;

  constructor() {
    this.userUpdatedSub = this.userService.userUpdated.subscribe(user => {
      this.onUserUpdate(user);
      console.log('user updated')
    }
    );
    this.userDeletedSub = this.userService.userDeleted.subscribe(user => {
      this.onDeleteUser(user);
    })


  }
  ngOnDestroy(): void {
    this.userUpdatedSub.unsubscribe();
    this.userDeletedSub.unsubscribe();
    console.log('app destroyed');
  }
  onDeleteUser(user: User): void {
    this.userService.deleteUser(user);

  }

  onUserUpdate(user: User) {
    this.userService.updateUser(user);

  }
}
