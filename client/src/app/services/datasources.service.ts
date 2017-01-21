import { Injectable } from "@angular/core";

import { DataSource } from "../domain/datasources.model";

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
export class DataSourcesServices {

    getDataSources(): Promise<DataSource[]> {
        return new Promise((resolve, reject) => {
            resolve(datasrcs);
        });
    }
}
