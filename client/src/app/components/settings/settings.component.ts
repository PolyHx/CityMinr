import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { DataSource } from '../../domain/datasource.model';
import { DataSourceService } from '../../services/datasource.service';
import { SettingService } from '../../services/setting.service';

@Component({
    selector: 'settings',
    templateUrl: './settings.template.html'
})
export class SettingsComponent {

    private opened: boolean = false;

    private datasources: DataSource[];
    private dataformats: string[];

    constructor(private dataService: DataSourceService, private settingService: SettingService) {
        this.init();
    }

    async init() {
        this.datasources = await this.dataService.getDataSources();
        this.dataformats = this.settingService.getFormatsRef();
    }

    updateDataSource(name: string, check: boolean) {
        if (name) {
            if (check) {
                this.settingService.addDataSource(this.dataService.getDataIdByName(name));
            } else {
                console.log(name + ':' + this.dataService.getDataIdByName(name));
                this.settingService.removeDataSource(this.dataService.getDataIdByName(name));
            }
        }

    }

    updateFormats(format: string, check: boolean) {
        if (format) {
            
            if (check) {
                this.settingService.addFormat(format);
            } else {
                this.settingService.removeFormat(format);
            }
        }
    }
}
