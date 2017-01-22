import { LoginService } from '../services/login.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
    constructor(private loginService: LoginService, private router: Router) { }

    async canActivate(): Promise<boolean> {
        let loggedIn = await this.loginService.isSignedIn();
        if (!loggedIn) {
            console.log("Not authenticated");
            this.router.navigate(["/login"]);
            return false;
        }
        return true;
    }
}