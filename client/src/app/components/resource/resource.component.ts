import { LabelService } from '../../services/label.service';
import { Component, Input, Output, EventEmitter, trigger, state, style, transition, animate } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'resource',
    templateUrl: './resource.template.html',
    animations: [
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
export class ResourceComponent {
    @Input("resource") resource;
    private cartState: string = "notInCart";

    constructor(private router: Router, private labelService: LabelService) {
    }

    toggleCart() {
        if (this.cartState === "inCart") {
            this.removeFromCart();
        } else {
            this.addToCart();
        }
    }

    addToCart() {
        this.cartState = "inCart";
    }

    removeFromCart() {
        this.cartState = "notInCart";
    }
}
