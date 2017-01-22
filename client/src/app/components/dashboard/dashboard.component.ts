import { GoogleProfile } from '../../domain/google-profile.model';
import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from "../../services/login.service";
import { SearchService } from '../../services/search.service';
import { FormsModule } from '@angular/forms';

declare var gapi: any;

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.template.html'
})
export class DashboardComponent implements AfterViewInit {
    private activeUser: GoogleProfile;

    constructor(private loginService: LoginService, private router: Router, private searchService: SearchService) {
    }

    saveQuery(query:string){
        this.searchService.save(query);
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
        });
    }

    async fetchActiveUser() {
        this.activeUser = await this.loginService.getActiveUser();
    }

    ngAfterViewInit() {
        this.googleInit();
        this.fetchActiveUser();
    }

    clickLogout() {
        this.loginService.signOut();
        this.router.navigate(["/login"]);
    }
}
