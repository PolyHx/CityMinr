import { Injectable } from "@angular/core";

import { DataSource } from '../domain/datasource.model';
import { SettingService } from './setting.service';
import { environment } from '../../environments/environment';

@Injectable()
export class DataSourceService {
    API_URL = environment.API_URL;

    private dataSource : DataSource[] = [];

    constructor(private settingService: SettingService) {

    }

    getDataSources(): Promise<DataSource[]> {
        return new Promise((resolve, reject) => {

            let request = require("request");

            let options = {
                method: 'GET',
                url: this.API_URL + '/dataset',
                headers: { 'cache-control': 'no-cache', 'content-type': 'application/x-www-form-urlencoded' },
            };
            var self = this;
            request(options, function (error, response, body) {
                if (error) throw new Error(error);

                let obj = JSON.parse(body);
                for (let ob of obj["datasets"]) {
                    self.dataSource.push(ob);
                    self.settingService.addDataSource(ob._id);
                }
                resolve(self.dataSource);
            });
        });
    }

    getDataIdByName(name:string) {
        for (let d of this.dataSource) {
            if (d.name === name) {
                return d._id;
            }
        }
    }
}
