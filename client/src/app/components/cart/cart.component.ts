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
                height: '100vh'
            })),
            transition('expanded => collapsed', animate('200ms ease-in')),
            transition('collapsed => expanded', animate('200ms ease-out'))
        ])
    ]
})
export class CartComponent {

    state: string;

    private opened: Boolean = false;
    private itemCount: number = 0;

    @Input() cartItems : ResourceResult[];
    @Output() cartItemsChange:EventEmitter<ResourceResult[]> = new EventEmitter<ResourceResult[]>();

    private code: string = "{\n" +
    "   id: 'caca2'\n" +
    "   name: 'Quebec'\n" +
    "}\n";

    constructor() {
        this.state = 'expanded';
        this.itemCount = 0;
    }

    toogleView() { 
        if(this.state === 'expanded') {
            this.state = 'collapsed'; 
        } else {
            this.state = 'expanded';
        }
    }

    removeSource(resource: ResourceResult) {

        let index = this.cartItems.indexOf(resource);

        if (index > -1) {
            this.cartItems.splice(index, 1);
        }   

        this.cartItemsChange.emit(this.cartItems);
    }

    updateCart(result:ResourceResult[]) {
        this.cartItems = result;
        this.itemCount = this.cartItems.length;
    }

}
