import { DataService } from '../../../services/data.service';
import {
    AfterViewInit,
    Component,
    DoCheck,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges
} from '@angular/core';
import { Router } from '@angular/router';

import { ResourceResult } from '../../../domain/search-result.model';

@Component({
    selector: 'visualize-modal',
    templateUrl: './visualize-modal.template.html'
})
export class VisualizeModalComponent implements DoCheck {
    @Input("resource") resource: ResourceResult;

    @Input("open") open: boolean;
    @Output("openChange") openChange = new EventEmitter();

    private loading = false;

    private resourceContent;
    private lastResource;

    constructor(private dataService: DataService) {
    }

    async ngDoCheck() {
        if (this.loading) {
            return;
        }
        if (this.open) {
            if (this.resource != this.lastResource && this.resource) {
                this.loading = true;
                console.log("loading");
                if (this.resource.format == "json") {
                    this.dataService.getDataFromUrl(this.resource.url).then((data: any) => {
                        this.resourceContent = this.formatJSON(data._body);
                        this.lastResource = this.resource;
                        this.loading = false;
                    }).catch((err) => {
                        this.loading = false;
                        console.log(err);
                    });
                } else if(this.resource.format == "pdf"){
                    this.loading = false;
                }
            }
        }
    }

    formatJSON(data: string) {
        return JSON.stringify(JSON.parse(data), null, 4);
    }

    close() {
        this.open = false;
        this.openChange.emit(false);
    }
}
