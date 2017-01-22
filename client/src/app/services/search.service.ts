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
            format: 'json',
            url: 'http://donnees.ville.montreal.qc.ca/dataset/00bd85eb-23aa-4669-8f1b-ba9a000e3dd8/resource/e9b0f927-8f75-458c-8fda-b5da65cc8b73/download/limadmin.json',
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
            format: 'pdf',
            url: 'http://donnees.ville.montreal.qc.ca/dataset/2b7dcae7-a3e5-4f5d-81de-ccde2c518e55/resource/99721d27-8fd9-46d0-8a3c-aabf0a29c6cf/download/manuel-complet.pdf',
            id: '0987654321',
            size: 36
        },
        {
            description: 'A nice resource 2',
            name: 'NiceRes2',
            format: 'geojson',
            url: 'http://donnees.ville.montreal.qc.ca/dataset/00bd85eb-23aa-4669-8f1b-ba9a000e3dd8/resource/e9b0f927-8f75-458c-8fda-b5da65cc8b73/download/limadmin.json',
            id: '0987654321',
            size: 36
        },
        {
            description: 'A nice resource 2',
            name: 'NiceRes2',
            format: 'json',
            url: 'http://donnees.ville.montreal.qc.ca/dataset/00bd85eb-23aa-4669-8f1b-ba9a000e3dd8/resource/e9b0f927-8f75-458c-8fda-b5da65cc8b73/download/limadmin.json',
            id: '0987654321',
            size: 36
        },
        {
            description: 'A nice resource 2',
            name: 'NiceRes2',
            format: 'json',
            url: 'http://donnees.ville.montreal.qc.ca/dataset/00bd85eb-23aa-4669-8f1b-ba9a000e3dd8/resource/e9b0f927-8f75-458c-8fda-b5da65cc8b73/download/limadmin.json',
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
                        if (add) {
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
