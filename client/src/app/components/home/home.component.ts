import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'home',
    templateUrl: './home.template.html'
})
export class HomeComponent {
    constructor(private router: Router) {
    }
}
