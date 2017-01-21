import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'login',
    templateUrl: './login.template.html'
})
export class LoginComponent {
    constructor(private router: Router) {
    }
}
