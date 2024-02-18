import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user.service';
import { Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit {

  user$: Observable<User | null> = of(null);
  constructor(
    private route: ActivatedRoute,
    private userService: UserService
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
}
