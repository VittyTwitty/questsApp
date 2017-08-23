import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { ValidationPatternsService } from '../../shared/services/validation-patterns.service';

@Component({
  selector: 'q-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})

export class LoginComponent {
  public loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, Validators.compose([
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(30),
      Validators.pattern(this.validationPattern.email)
    ])),
    password: new FormControl(null, Validators.compose([
      Validators.required,
      Validators.minLength(9),
      Validators.maxLength(30),
      // Validators.pattern(this.validationPattern.password)
    ]))
  });

  constructor(private router: Router,
              private authService: AuthService,
              private validationPattern: ValidationPatternsService) {
  }

  public loginUser($event, myForm: any) {
    $event.preventDefault();
    this.authService.login(myForm.email, myForm.password)
      .then((user) => {
        user.subscribe((res) => {
          let r = res;
        });
        this.router.navigate(['/']);
      });

  }
}
