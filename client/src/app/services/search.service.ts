import { Injectable } from "@angular/core";

import { DataSource } from "../domain/datasource.model";
import { ResourceResult, SearchResult, FormatInfo } from '../domain/search-result.model';

var result: SearchResult[] = [{

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
    methodologie: 'Dont',
    groups: [
        'Transport'
    ],
    title: 'Search Result Nice',
    formats: []
},
{

    id: '1234567890',
    license_title: 'MIT',
    resources: [
        {
            description: 'A nice resource 2',
            name: 'NiceRes2',
            format: 'PDF',
            url: 'http://google.com',
            id: '0987654321',
            size: 36
        },
        {
            description: 'A nice resource 2',
            name: 'NiceRes2',
            format: 'GEOJSON',
            url: 'http://google.com',
            id: '0987654321',
            size: 36
        },
        {
            description: 'A nice resource 2',
            name: 'NiceRes2',
            format: 'JSON',
            url: 'http://google.com',
            id: '0987654321',
            size: 36
        },
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
    methodologie: 'Dont',
    groups: [
        'Transport'
    ],
    title: 'Search Result Nice',
    formats: []
}];

@Injectable()
export class SearchService {

    search(query: string): Promise<SearchResult[]> {
        return new Promise((resolve, reject) => {

            let add = true;
            for (let res of result) {
                for (let resource of res.resources) {
                    if (res.formats.length) {
                        add = true;
                        for (let itt of res.formats) {
                            if (itt.format == resource.format) {
                                itt.count++;
                                add = false;
                                break;
                            }
                        }
                        if(add) {
                            res.formats.push({ format: resource.format, count: 1 });    
                        }
                    } else {
                        res.formats.push({ format: resource.format, count: 1 });
                    }

                }
            }
            resolve(result);
        });
    }
}
