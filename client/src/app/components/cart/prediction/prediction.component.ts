import { LabelService } from '../../../services/label.service';
import { SearchService } from '../../../services/search.service';
import { Component, Input, Output, EventEmitter, trigger, state, style, transition, animate, AfterViewInit, SimpleChanges, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { ResourceResult } from '../../../domain/search-result.model';

@Component({
    selector: 'prediction',
    templateUrl: './prediction.template.html'
})
export class PredictionComponent implements DoCheck, AfterViewInit {
    @Input() cartItems: ResourceResult[] = [];
    @Output() cartItemsChange: EventEmitter<ResourceResult[]> = new EventEmitter<ResourceResult[]>();

    private currentPrediction: ResourceResult;

    constructor(private router: Router, private searchService: SearchService, private labelService: LabelService) {
    }

    ngDoCheck() {
        if (this.cartItems && !this.currentPrediction) {
            this.currentPrediction = this.nextPrediction();
        }
    }

    ngAfterViewInit() {
    }

    nextPrediction(): ResourceResult {
        var pre =  this.searchService.getPrediction(this.cartItems);
        console.log(pre);
        return pre;            
    }

    validatePrediction(id: string) {
        this.currentPrediction = this.nextPrediction();
        this.cartItems.push(this.currentPrediction);
        this.cartItemsChange.emit(this.cartItems);
    }

    rejectPrediction(id: string) {
        this.currentPrediction = this.nextPrediction();
    }
}
