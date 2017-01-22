import { Injectable } from "@angular/core";

import { DataSource } from "../domain/datasource.model";
import { ResourceResult, SearchResult, FormatInfo } from '../domain/search-result.model';

@Injectable()
export class SearchService {

    extractResult(res: any) {
        let result: SearchResult = {
            id: String(res['id']).toString(),
            license_title: res['license_title'],
            resources: [],
            methodologie: res['methodologie'],
            groups: [],
            title: res['title'],
            formats: []
        };

        for (let resss of res['resources']) {
            result.resources.push({
                description: String(resss['description']).toString(),
                name: String(resss['name']).toString(),
                format: resss['format'],
                url: String(resss['url']).toString(),
                id: String(resss['id']).toString(),
                size: resss['size']
            });
        }
        return result;
    }

    search(query: string): Promise<SearchResult[]> {
        return new Promise((resolve, reject) => {

            var request = require("request");

            var options = {
                method: 'GET',
                url: 'http://localhost:8080/search',
                qs:
                {
                    query: 'transport',
                    datasets: '5884057af36d2855565376c6',
                    formats: 'json,geojson'
                },
                headers:
                {
                    'cache-control': 'no-cache',
                    'content-type': 'application/x-www-form-urlencoded'
                },
            };
            var self = this;
            request(options, function (error, response, body) {
                if (error) throw new Error(error);

                var obj = JSON.parse(body);
                var result: SearchResult[] =[];
                for (let ob of obj['response']) {
                    result.push(self.extractResult(ob));
                }
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
        });
    }
}
