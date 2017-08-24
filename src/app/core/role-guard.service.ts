import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, CanActivateChild } from '@angular/router';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RoleGuard implements CanActivate {
  public adminUid: any;
  private user: any;

  constructor(public userService: UserService,
    public authService: AuthService,
    private router: Router) {
  }

  public canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    return this.checkLogin(url);
  }

  public checkLogin(url: string): boolean {
    this.user = this.userService.getUser();
    if (this.user) {
      this.adminUid = this.user.uid;
    }
    if (this.adminUid === 'kQvVa3wF3VPJg2SVolGQsOOiHwy1') {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }

}
