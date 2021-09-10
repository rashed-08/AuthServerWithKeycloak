import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class FooGuard implements CanActivate {

  /**
   *
   */
  constructor(private loginService: LoginService,
    private router: Router) {
    
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      const requiredRoles = route.data.requiredRoles;
      if (!this.loginService.getIsLogged()) {
        this.router.navigate(['/']);
        return false;
      }
      const realRole = this.loginService.getIsAdmin() ? 'admin' : 'user';
      if (requiredRoles.indexOf(realRole) === -1) {
        this.router.navigate(['/']);
        return false;
      }
    return true;
  }
  
}
