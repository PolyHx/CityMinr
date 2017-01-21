import { Injectable } from "@angular/core";

import { DataSource } from "../domain/datasource.model";

const datasrcs: DataSource[] = [
    {
        id: 'caca',
        name: 'Montreal'
    },
    {
        id: 'caca2',
        name: 'Quebec'
    }
]


@Injectable()
export class DataSourceService {

    getDataSources(): Promise<DataSource[]> {
        return new Promise((resolve, reject) => {
            resolve(datasrcs);
        });
    }
}
