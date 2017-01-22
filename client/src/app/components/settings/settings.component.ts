import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { DataSource } from '../../domain/datasource.model';
import { DataSourceService } from '../../services/datasource.service';

@Component({
    selector: 'settings',
    templateUrl: './settings.template.html'
})
export class SettingsComponent {

    private opened: boolean = false;

    private datasources: DataSource[];
    private dataformats: string[] = ['json', 'csv', 'geojson', 'xlsx', 'txt', 'pdf', 'odt'];

    constructor(private dataService: DataSourceService) {
        this.init();
    }

    async init() {
        this.datasources = await this.dataService.getDataSources();
    }
}
