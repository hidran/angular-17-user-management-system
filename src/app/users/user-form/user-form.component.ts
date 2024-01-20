import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { User, UserService } from '../user.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {

  user: User | null = null;
  originalUser: Partial<User> = {};
  @Output() updateUser = new EventEmitter<User>();

  constructor(private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }
  ngOnInit(): void {
    this.originalUser = { ...this.user };
    this.route.paramMap.subscribe(p => {
      const segment = p.get('id');
      if (!segment) {
        this.initUser();
        return;
      }
      const id = Number(segment);
      this.user = this.userService.getUser(id);
      console.log(id, this.user)
    });
  }
  resetForm(f: NgForm) {

    console.log(this.originalUser)
    f.resetForm(this.originalUser);

  }




  onSubmitForm(f: NgForm) {
    const id = this.user?.id ?? 0;
    const userUpdated = { ...f.value, id };

    if (!id) {
      this.userService.userCreated.next(userUpdated);
    } else {
      this.userService.userUpdated.next(userUpdated);
    }

    this.router.navigateByUrl('/users');

  }
  private initUser() {
    this.user = {
      id: 0,
      name: '',
      fiscalCode: '',
      lastName: '',
      email: '',
      phone: '',
      province: ''
    }
  }
}
