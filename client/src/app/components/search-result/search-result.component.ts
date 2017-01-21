import { LabelService } from '../../services/label.service';
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
        ])
    ]
})
export class SearchResultComponent {
    private open: string = "closed";

    private resource: any = {
        description: "Organigramme-cdn-ndg-2014",
        name: "Organigramme-cdn-ndg-2014",
        format: "PDF",
        url: "http://google.com"
    }

    constructor(private router: Router, private labelService: LabelService) {
    }

    openDropdown() {
        if (this.open === "open") {
            this.open = "closed";
        } else {
            this.open = "open";
        }
    }
}
