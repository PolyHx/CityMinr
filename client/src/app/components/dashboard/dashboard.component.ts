import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.template.html'
})
export class DashboardComponent {
    constructor(private router: Router) {
    }
}
