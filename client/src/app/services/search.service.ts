import { Injectable } from "@angular/core";

import { DataSource } from "../domain/datasource.model";
import { ResourceResult, SearchResult } from '../domain/search-result.model';

const result : SearchResult[] = [{

    id: '1234567890',
    license_title: 'MIT',
    resources: [
        {
        description: 'A nice resource',
    name: 'NiceRes',
    format: 'JSON',
    url: 'http://google.com',
    id: '0987654321',
    size: 36
        }
    ],
    num_resources: 1,
    methodologie: 'Dont' ,
    groups: [
        'Transport'
    ],
    title: 'Search Result Nice',
    formats: [
        'JSON'
    ]
},
{

    id: '1234567890',
    license_title: 'MIT',
    resources: [
        {
        description: 'A nice resource 2',
    name: 'NiceRes2',
    format: 'GEOJSON',
    url: 'http://google.com',
    id: '0987654321',
    size: 36
        }
    ],
    num_resources: 1,
    methodologie: 'Dont' ,
    groups: [
        'Transport'
    ],
    title: 'Search Result Nice',
    formats: [
        'GEOJSON'
    ]
}];

@Injectable()
export class SearchService {

    search(query:string): Promise<SearchResult[]> {
        return new Promise((resolve, reject) => {
            resolve(result);
        });
    }
}
