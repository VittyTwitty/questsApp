import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../core/auth.service";
import { ValidationPatternsService } from "../../shared/services/validation-patterns.service";

@Component({
    selector: 'q-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss']
})

export class LoginComponent implements OnInit {
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private authService: AuthService,
        private validationPattern: ValidationPatternsService
    ) { }
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
    })

    ngOnInit() { }
    public loginUser($event, myForm: any) {
        console.log(myForm.email)
        $event.preventDefault();
        this.authService.login(myForm.email, myForm.password)
            .then(res => {
                this.router.navigate(['/']);
            })
            .catch(error => {

            })

    }

    // public loginUserGoogle($event) {
    //     $event.preventDefault();
    //     this.authService.loginGoogle();

    // }
}