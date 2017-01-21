import { Component, trigger, state, style, transition, animate } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'search-result',
    templateUrl: './search-result.template.html',
    animations: [
        trigger('caretState', [
            state("open", style({
                transform: 'rotate(180deg)'
            })),
            state('closed', style({
                transform: 'rotate(270deg)'
            })),
            transition('open => closed', animate('100ms ease-in')),
            transition('closed => open', animate('100ms ease-out'))
        ]),
        trigger('cartState', [
            state("inCart", style({
                transform: 'rotate(45deg)',
                color: '#ff0000'
            })),
            state('notInCart', style({
                transform: 'rotate(0deg)',
                color: '#007cbb'
            })),
            transition('inCart => notInCart', animate('100ms ease-in')),
            transition('notInCart => inCart', animate('100ms ease-out'))
        ])
    ]
})
export class SearchResultComponent {
    private open: string = "closed";

    private cartState: string = "notInCart";

    constructor(private router: Router) {
    }

    openDropdown() {
        if (this.open === "open") {
            this.open = "closed";
        } else {
            this.open = "open";
        }
    }

    toggleCart() {
        if(this.cartState === "inCart"){
            this.removeFromCart();
        } else {
            this.addToCart();
        }
    }

    addToCart() {
        this.cartState = "inCart";
    }

    removeFromCart()  {
        this.cartState = "notInCart";
    }
}
