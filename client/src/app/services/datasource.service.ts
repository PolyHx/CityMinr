import { Injectable } from "@angular/core";

import { DataSource } from '../domain/datasource.model';

@Injectable()
export class DataSourceService {

    getDataSources(): Promise<DataSource[]> {
        return new Promise((resolve, reject) => {

            let request = require("request");
            var data : DataSource[] = [];

            let options = {
                method: 'GET',
                url: 'http://localhost:8080/dataset',
                headers: { 'cache-control': 'no-cache', 'content-type': 'application/x-www-form-urlencoded' },
            };

            request(options, function (error, response, body) {
                if (error) throw new Error(error);

                let obj = JSON.parse(body);
                for (let ob of obj["datasets"]) {
                    data.push(ob);
                }
                resolve(data);
            });
        });
    }
}
