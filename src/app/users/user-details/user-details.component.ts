import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit {
  user: User | null = null;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {

  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(p => {
      const segment = p.get('id');

      const id = Number(segment);
      this.user = this.userService.getUser(id);

    });
  }
}
