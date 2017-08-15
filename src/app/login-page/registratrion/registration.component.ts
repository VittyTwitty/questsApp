import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../../core/auth.service";
import { Router } from "@angular/router";
import { ValidationPatternsService } from "../../shared/services/validation-patterns.service";
import { QuestionService } from "../../shared/questions.service";

@Component({
    selector: 'q-registration',
    templateUrl: 'registration.component.html',
    styleUrls: ['registration.component.scss']
})

export class RegistrationComponent implements OnInit {

    public registrationForm: FormGroup = new FormGroup({
        name: new FormControl(null, Validators.compose([
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(30),
        ])),
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
            Validators.pattern(this.validationPattern.password)
        ])),
        confirm_password: new FormControl(null, Validators.compose([
            Validators.required,
            this.validatePasswordConfirmation.bind(this)
        ]))
    })
    constructor(
        private authService: AuthService,
        private router: Router,
        private validationPattern: ValidationPatternsService
    ) { }

    ngOnInit() { }

    public validatePasswordConfirmation(control: FormControl): any {
        if (this.registrationForm) {
            return control.value === this.registrationForm.get('password').value ? null : { notSame: true };
        }
    }
    registration($event, myForm: any) {
        $event.preventDefault();
        this.authService
            .register(myForm.email, myForm.password)
            .then((user) => {
                this.authService.addUserInfoFromForm(user.uid, myForm.email, myForm.name, myForm.password)
                    .then((res) => {
                        this.router.navigate(['/sign-in']);
                    })
                    .catch((err) => {

                    })
            })
            .catch((error) => {

            })

    }
}