import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivateFn } from '@angular/router';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { activateUsersFnGuard } from './users/activate-users-fn.guard';

const routes: Routes = [{
  path: 'users',
  component: UsersListComponent,
  canActivate: [activateUsersFnGuard]
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
  canActivate: [activateUsersFnGuard],
},
{
  path: 'users/:id',
  component: UserFormComponent,
  canActivate: [activateUsersFnGuard],
},
{
  path: 'users/:id/show',
  component: UserDetailsComponent,
  canActivate: [activateUsersFnGuard],
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
