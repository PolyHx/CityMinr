import { LabelService } from '../../services/label.service';
import { Component, Input, Output, EventEmitter, trigger, state, style, transition, animate, OnChanges, SimpleChanges, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { ResourceResult } from '../../domain/search-result.model';

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
export class ResourceComponent implements DoCheck {

    @Input("resource") resource

    @Input() cartItems: ResourceResult[];
    @Output() cartItemsChange: EventEmitter<ResourceResult[]> = new EventEmitter<ResourceResult[]>();
    @Output() triggerVisualize = new EventEmitter();

    private cartState: string = "notInCart";

    constructor(private router: Router, private labelService: LabelService) {
    }

    toggleCart() {
        console.log(this.resource);
        if (this.cartState === "inCart") {
            this.removeFromCart();
        } else {
            this.addToCart();
        }
    }

    ngDoCheck() {
        if (this.cartItems) {
            let index = this.cartItems.indexOf(this.resource);

            if (index < 0) {
                this.cartState = "notInCart";
            } else {
                this.cartState = "inCart";
            }
        }
    }

    addToCart() {
        this.cartState = "inCart";

        this.cartItems.push(this.resource);
        this.cartItemsChange.emit(this.cartItems);
    }

    removeFromCart() {
        this.cartState = "notInCart";

        let index = this.cartItems.indexOf(this.resource);

        if (index > -1) {
            this.cartItems.splice(index, 1);
        }

        this.cartItemsChange.emit(this.cartItems);
    }

    clickVisualize() {
        this.triggerVisualize.emit(this.resource);
    }
}
