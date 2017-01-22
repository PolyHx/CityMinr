import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SearchResult, ResourceResult } from '../../domain/search-result.model';
import { SearchService } from '../../services/search.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'main-component',
    templateUrl: './main.template.html'
})

export class MainComponent {
    @ViewChild('search') search;
    @ViewChild('cart') cart;
    @Output() updateHistory = new EventEmitter();

    private searchResults : SearchResult[];

    private cartItemsMain : ResourceResult[] = [];

    constructor(private router: Router, private searchService: SearchService) {
        this.init();
    }

    updateCart(result : ResourceResult[]) {
        this.cartItemsMain = result;
        this.cart.updateCart(result)
    }

    onUpdateHistory() {
        this.updateHistory.emit();
    }

    async init() {
        this.searchResults = await this.searchService.search('cacamiel');
    }
}
