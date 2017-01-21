import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'my-app',
    templateUrl: './app.template.html'
})
export class AppComponent {
    constructor(private router: Router) {
    }
}
