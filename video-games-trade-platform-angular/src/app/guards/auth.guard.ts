import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { UserService } from '../user/user.service';

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const userService = inject(UserService);
  const router = inject(Router); 
  let user = {};

  userService.getProfile().subscribe((userData) => {    
    user = userData;
    // console.log(user);
  });

  if (user) {
    return true;
  }
  router.navigate(['/home']);
  return false;
};
