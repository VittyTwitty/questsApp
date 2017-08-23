import { Injectable } from '@angular/core';
import { UserService } from '../../core/user.service';
import { AuthService } from '../../core/auth.service';

@Injectable()
export class SharedService {
  public user: any;
  public trueAnswers: any;
  public counter: number;

  constructor(private userService: UserService, private authService: AuthService) {
    this.authService.authListener()
      .subscribe(
        (data) => {
          this.user = this.userService.getUser();
        });
  }
}
