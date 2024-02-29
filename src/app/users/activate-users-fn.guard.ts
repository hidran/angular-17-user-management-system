import { CanActivateFn } from '@angular/router';

export const activateUsersFnGuard: CanActivateFn = (route, state) => {
  return false;
};
