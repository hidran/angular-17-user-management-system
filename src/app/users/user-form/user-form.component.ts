import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { User, UserService } from '../user.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {

  user$: Observable<User | null> = of(null);
  originalUser: Partial<User> = {};
  @Output() updateUser = new EventEmitter<User>();

  constructor(private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }
  ngOnInit(): void {
    this.user$ = this.route.paramMap.pipe(
      switchMap(params => {
        const segment = params.get('id');

        const id = Number(segment);
        if (id) {
          return this.userService.getUser(id);
        } else {
          return of(null);
        }

      })
    );
  }
  resetForm(f: NgForm) {

    console.log(this.originalUser)
    f.resetForm(this.originalUser);

  }




  onSubmitForm(f: NgForm) {
    const id = f.value.id ?? 0;
    const userUpdated = { ...f.value, id };

    if (!id) {
      this.userService.userCreated.next(userUpdated);
    } else {
      this.userService.userUpdated.next(userUpdated);
    }

    this.router.navigateByUrl('/users');

  }
  private initUser() {
    this.user$ = of({
      id: 0,
      name: '',
      fiscalCode: '',
      lastName: '',
      email: '',
      phone: '',
      province: ''
    })
  }
}
