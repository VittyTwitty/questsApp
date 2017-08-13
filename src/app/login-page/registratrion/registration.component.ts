import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { AuthService } from "../../core/auth.service";
import { Router } from "@angular/router";

@Component({
    selector: 'q-registration',
    templateUrl: 'registration.component.html',
    styleUrls: ['registration.component.scss']
})

export class RegistrationComponent implements OnInit {

    public signUpForm: FormGroup = new FormGroup({
        email: new FormControl(''),
        password: new FormControl(''),
        confirm_password: new FormControl('')
    })
    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit() { }

    signUpUser($event, myForm: any) {
        $event.preventDefault();
        this.authService
            .register(myForm.email, myForm.password)
            .then((user) => {
                this.authService.addUserInfoFromForm(user.uid, myForm.email, myForm.password)
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