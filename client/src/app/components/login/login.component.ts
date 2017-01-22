import { AfterViewInit, Component, OnInit } from '@angular/core';
import { LoginService } from "../../services/login.service";
import { Router } from '@angular/router';

declare var gapi: any;

@Component({
    selector: 'login',
    templateUrl: './login.template.html'
})
export class LoginComponent implements AfterViewInit {
    constructor(private loginService: LoginService, private router: Router) {
    }

    public auth2: any;
    public googleInit() {
        let that = this;
        gapi.load('auth2', () => {
            that.auth2 = gapi.auth2.init({
                client_id: '601716546817-2mfe0pm43j94tcj0kjceg0ljkr58lvc2.apps.googleusercontent.com',
                cookiepolicy: 'single_host_origin',
                scope: 'profile email'
            });
            console.log("Init?");
            gapi.signin2.render('signin2', {
                'scope': 'profile email',
                'width': 240,
                'height': 50,
                'longtitle': true,
                'theme': 'dark',
                'onsuccess': (googleUser) => {
                    let profile = googleUser.getBasicProfile();
                    this.loginService.signIn({
                        full_name: profile.getName(),
                        given_name: profile.getGivenName(),
                        family_name: profile.getFamilyName(),
                        image_url: profile.getImageUrl(),
                        email: profile.getEmail()
                    });
                    window.location.href = "/dashboard";
                },
                'onfailure': (error) => {
                    alert(JSON.stringify(error, undefined, 2));
                }
            });
        });
    }

    ngAfterViewInit() {
        this.googleInit();
    }
}
