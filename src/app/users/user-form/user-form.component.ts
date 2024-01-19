import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { User, UserService } from '../user.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {
  resetForm(f: NgForm) {

    console.log(this.originalUser)
    f.resetForm(this.originalUser);

  }


  constructor(private userService: UserService) {

  }
  ngOnInit(): void {
    this.originalUser = { ...this.user }
  }
  @Input() user: Partial<User> = {};
  originalUser: Partial<User> = {};
  @Output() updateUser = new EventEmitter<User>();
  onSubmitForm(f: NgForm) {

    const userUpdated = { ...f.value, id: this.user.id ?? 0 };

    this.updateUser.emit(userUpdated);
    f.reset();

  }
}
