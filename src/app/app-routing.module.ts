import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivateFn } from '@angular/router';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { activateUsersFn } from './users/activate-users-fn';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [{
  path: 'users',
  component: UsersListComponent,
  canActivate: [activateUsersFn]
},
{
  path: '',
  redirectTo: 'users',
  pathMatch: 'full',

},

{
  path: 'users/create',
  component: UserFormComponent,
  pathMatch: 'full',
  canActivate: [activateUsersFn],
},
{
  path: 'users/:id',
  component: UserFormComponent,
  canActivate: [activateUsersFn],
},
{
  path: 'users/:id/show',
  component: UserDetailsComponent,
  canActivate: [activateUsersFn],
},
{
  path: 'login',
  component: LoginComponent
},
{
  path: 'signup',
  component: SignupComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
