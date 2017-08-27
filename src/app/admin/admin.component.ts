import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from "../core/auth.service";
import { Subscription } from "rxjs/Subscription";
import { UserService } from "../core/user.service";

@Component({
  selector: 'q-admin',
  templateUrl: 'admin.component.html',
  styleUrls: ['admin.component.scss']
})

export class AdminComponent implements OnInit, OnDestroy {
  user: any;
  public sub: Subscription;
  public loggedInUser: boolean = true;



  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {

  }
  ngOnInit(): void {
    this.sub = this.authService.authListener()
      .subscribe(
      (data) => {
        this.user = this.userService.getUser();
        console.log(this.user)
        if(this.user) {
          this.loggedInUser = true;
        } else {
          this.loggedInUser = false;
        }
      })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
