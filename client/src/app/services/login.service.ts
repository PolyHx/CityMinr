import { GoogleProfile } from '../domain/google-profile.model';
import { Injectable } from "@angular/core";

declare var gapi: any;
declare var jQuery: any;
declare var window: any;

@Injectable()
export class LoginService {

    async signIn(user: GoogleProfile) {
        localStorage.setItem("currentUser", JSON.stringify(user));
    }

    async signOut() {
        localStorage.removeItem("currentUser");
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
        });
    }

    async getActiveUser(): Promise<GoogleProfile> {
        let currentUser = localStorage.getItem("currentUser");
        if (currentUser) {
            return JSON.parse(currentUser);
        } else {
            return null;
        }
    }

    async isSignedIn(): Promise<boolean> {
        return localStorage.getItem("currentUser") !== null;
    }
}
