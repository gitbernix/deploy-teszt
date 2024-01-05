import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
    public loggedInStatus$?: Observable<boolean | null>;
    public userEmail$?: Observable<string | null>;

    constructor(private authService: AuthService) {
        this.loggedInStatus$ = this.authService.loggedInStatus$;
        this.userEmail$ = this.authService.userEmail$;
    }

    ngOnInit(): void {}

    async logout(): Promise<void> {
        await this.authService.logout();
    }
}
