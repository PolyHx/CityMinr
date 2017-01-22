import { document } from '@angular/platform-browser/src/facade/browser';
import { ViewChild } from '@angular/core/src/metadata/di';
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
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { ResourceResult } from '../../../domain/search-result.model';

declare var PDFObject: any;
declare var google: any;
declare var jQuery: any;

@Component({
    selector: 'visualize-modal',
    templateUrl: './visualize-modal.template.html'
})
export class VisualizeModalComponent implements DoCheck {
    @ViewChild("map") map;
    @Input("resource") resource: ResourceResult;

    @Input("open") open: boolean;
    @Output("openChange") openChange = new EventEmitter();

    private loading = false;

    private resourceContent;
    private lastResource;

    constructor(private dataService: DataService, private sanitizer: DomSanitizer) {
    }

    async ngDoCheck() {
        if (this.loading) {
            return;
        }
        if (this.open) {
            if (this.resource != this.lastResource && this.resource) {
                this.loading = true;
                console.log("loading");
                if (this.resource.format == "JSON") {
                    this.dataService.getDataFromUrl(this.resource.url).then((data: any) => {
                        this.resourceContent = this.formatJSON(data._body);
                        this.lastResource = this.resource;
                        this.loading = false;
                    }).catch((err) => {
                        this.loading = false;
                        console.log(err);
                    });
                } else if (this.resource.format == "PDF") {
                    this.resourceContent = this.sanitizer.bypassSecurityTrustResourceUrl(this.resource.url);
                    this.lastResource = this.resource;
                    this.loading = false;
                } else if (this.resource.format == "GEOJSON") {
                    this.lastResource = this.resource;
                    this.loading = false;
                    var myLatlng = new google.maps.LatLng(45.445151, -73.645651);
                    var mapOptions = {
                        zoom: 10,
                        center: myLatlng,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    };
                    var map = new google.maps.Map(this.map.nativeElement,
                        mapOptions);
                    map.data.loadGeoJson(this.resource.url);
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
