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
  userCreatedSub: Subscription;
  constructor() {
    this.userUpdatedSub = this.userService.userUpdated.subscribe(user => {
      this.onUserUpdate(user);
      console.log('user updated')
    }
    );
    this.userDeletedSub = this.userService.userDeleted.subscribe(user => {
      this.onDeleteUser(user);
    });
    this.userCreatedSub = this.userService.userCreated.subscribe(user => {
      this.onCreateUser(user);
    });


  }
  ngOnDestroy(): void {
    this.userUpdatedSub.unsubscribe();
    this.userDeletedSub.unsubscribe();
    this.userCreatedSub.unsubscribe();
    console.log('app destroyed');
  }
  onDeleteUser(user: User): void {
    this.userService.deleteUser(user)
      .subscribe(console.log);

  }

  onUserUpdate(user: User): void {
    this.userService.updateUser(user).subscribe(console.log);;

  }
  onCreateUser(user: User) {
    this.userService.createUser(user).subscribe(console.log);;

  }
}
