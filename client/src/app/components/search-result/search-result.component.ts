import { LabelService } from '../../services/label.service';
import { Component, trigger, state, style, transition, animate, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { SearchResult, FormatInfo, ResourceResult } from '../../domain/search-result.model';

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

    @Input("result") result: SearchResult;

    @Input() cartItems: ResourceResult[];
    @Output() cartItemsChange: EventEmitter<ResourceResult[]> = new EventEmitter<ResourceResult[]>();

    private visualizedResource;
    private visualizeModalOpen: boolean = false;

    constructor(private router: Router, private labelService: LabelService) {
    }

    updateCart(result : ResourceResult[]) {
        this.cartItems = result;
        this.cartItemsChange.emit(result);
    }

    openDropdown() {
        if (this.open === "open") {
            this.open = "closed";
        } else {
            this.open = "open";
        }
    }

    triggerVisualizeModal(resource: ResourceResult) {
        this.visualizedResource = resource;
        this.visualizeModalOpen = true;
    }

    updateVisualizeModalOpen(newValue: boolean) {
        this.visualizeModalOpen = newValue;
    }
}
