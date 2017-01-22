import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { ResourceResult } from '../../../domain/search-result.model';

@Component({
    selector: 'visualize-modal',
    templateUrl: './visualize-modal.template.html'
})
export class VisualizeModalComponent {
    @Input("resource") resource: ResourceResult;

    @Input("open") open: boolean = false;
    @Output("openChange") openChange = new EventEmitter();

    private code: string = "{\n" +
    "   id: 'caca2'\n" +
    "   name: 'Quebec'\n" +
    "}\n";

    constructor() {
    }

    close() {
        this.open = false;
        this.openChange.emit(false);
    }
}
