import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../core/auth.service";

@Component({
    selector: 'q-login',
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private authService: AuthService
    ) { }
    public loginForm: FormGroup = new FormGroup({
        email: new FormControl(''),
        password: new FormControl('')
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