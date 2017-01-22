import { Component, trigger, state, style, transition, animate, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ResourceComponent } from '../resource/resource.component';
import { SearchResult, ResourceResult } from '../../domain/search-result.model';



@Component({
    selector: 'cart',
    templateUrl: './cart.template.html',
    animations: [
        trigger('openClose', [
            state("expanded", style({
                height: '0'
            })),
            state('collapsed', style({
                height: '100vh',
                margin: '-82px 0 0 0'
            })),
            transition('expanded => collapsed', animate('200ms ease-in')),
            transition('collapsed => expanded', animate('200ms ease-out'))
        ])
    ]
})
export class CartComponent {

    state: string;

    private opened: Boolean = false;

    @Input() cartItems : ResourceResult[];
    @Output() cartItemsChange:EventEmitter<ResourceResult[]> = new EventEmitter<ResourceResult[]>();

    constructor() {
        this.state = 'expanded';
    }

    toogleView() { 
        if(this.state === 'expanded') {
            this.state = 'collapsed'; 
        } else {
            this.state = 'expanded';
        }

        console.log(this.cartItems);
    }

}
