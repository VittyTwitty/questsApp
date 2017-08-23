import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/user.service';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'q-header',
  templateUrl: 'header.html',
  styleUrls: ['header.scss']
})

export class HeaderComponent implements OnInit {
  public userOnl: any;
  public loggedInUser: boolean = false;
  private user: any;

  constructor(private userService: UserService,
              private authService: AuthService,
              private router: Router) {

  }

  public qwe() {
    console.log(this.user = this.userService.getUser());
  }

  public ngOnInit() {
    this.authService.authListener()
      .subscribe(
        (data) => {
          this.setData();
        });
  }

  private setData() {
    this.user = this.userService.getUser();
    this.loggedInUser = (this.user) ? true : false;
  }

  private logOut() {
    this.authService.logout()
      .then((res) => {
        this.router.navigate(['/']);
      });
  }

}
