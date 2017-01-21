import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    selector: 'cart',
    templateUrl: './cart.template.html'
})
export class CartComponent {

    private opened: Boolean = false;

    //private datasets : string[];

    

    constructor() {
    }

}
