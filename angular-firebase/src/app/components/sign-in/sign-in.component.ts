import { Component } from '@angular/core';
import {
    AbstractControl,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
    public loginForm: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
    });

    get email(): AbstractControl | null {
        return this.loginForm.get('email');
    }

    get password(): AbstractControl | null {
        return this.loginForm.get('password');
    }

    constructor(private authService: AuthService) {}

    ngOnInit(): void {}

    public login() {
        this.authService.login(this.loginForm.value).subscribe();
    }

    public registration() {
        this.authService.registration(this.loginForm.value).subscribe();
    }

    public loginWithGoogle() {
        this.authService.loginWithGoogle();
    }
}
