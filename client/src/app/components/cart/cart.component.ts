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

    private opened: boolean = false;
    private itemCount: number = 0;

    private code: string = "No sources selected";
    private lang: string = "Select a laguage";

    @Input() cartItems : ResourceResult[];
    @Output() cartItemsChange:EventEmitter<ResourceResult[]> = new EventEmitter<ResourceResult[]>();

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
            this.itemCount = this.cartItems.length;
        }   

        if (this.itemCount === 0) {
             this.code = "No sources selected";
             this.lang = "Select a laguage";
        }

        this.cartItemsChange.emit(this.cartItems);
    }

    updateCart(result:ResourceResult[]) {
        this.cartItems = result;
        this.itemCount = this.cartItems.length;
    }

    generateCode() {
        if (this.itemCount) {
            switch (this.lang) {
                case 'javascript':
                   this.code = `function loadSources() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = httpRequest.responseText
            console.log(response);
        } else {
            console.log('There was a problem with the request.');
        }
    };
    xhttp.open("GET", "` + this.cartItems[0].url + `", true);
    xhttp.send();
}`
                    break;

                case 'php':
                    break;

                case 'nodejs':
                    break;

                case 'ruby':
                    break;

            }
        }
    }

}
