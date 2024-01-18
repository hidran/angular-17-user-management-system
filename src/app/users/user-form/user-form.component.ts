import { Component, Input } from '@angular/core';
import { User } from '../user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  @Input() user: Partial<User> = {};
}
