import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SearchResult } from '../../domain/search-result.model';
import { SearchService } from '../../services/search.service';

@Component({
    selector: 'main',
    templateUrl: './main.template.html'
})
export class MainComponent {

    private searchResults : SearchResult[];

    constructor(private router: Router, private searchService: SearchService) {
        this.init();
    }

    async init() {
        this.searchResults = await this.searchService.search('cacamiel');
    }
}
