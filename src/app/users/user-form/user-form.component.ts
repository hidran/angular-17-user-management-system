import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User, UserService } from '../user.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {


  constructor(private userService: UserService) {

  }
  @Input() user: Partial<User> = {};
  @Output() updateUser = new EventEmitter<User>();
  onSubmitForm(f: NgForm) {

    const userUpdated = { ...f.value, id: this.user.id ?? 0 };

    this.updateUser.emit(userUpdated);
    f.reset();

  }
}
