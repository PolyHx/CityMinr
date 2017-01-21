import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { DataSource } from '../../domain/datasources.model';
import { DataSourcesServices } from '../../services/datasources.service';

@Component({
    selector: 'settings',
    templateUrl: './settings.template.html'
})
export class SettingsComponent {

    private opened: Boolean = false;

    private datasources: DataSource[];
    private dataformats: string[] = ['json', 'csv', 'geojson', 'xlsx', 'txt', 'pdf', 'odt'];

    

    constructor(private dataService: DataSourcesServices) {
        this.init();
    }

    async init() {
        this.datasources = await this.dataService.getDataSources();
    }
}
