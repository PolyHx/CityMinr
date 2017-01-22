import { Injectable } from "@angular/core";

import { DataSource } from '../domain/datasource.model';
import { ResourceResult, SearchResult, FormatInfo } from '../domain/search-result.model';
import { SettingService } from './setting.service';

@Injectable()
export class SearchService {

    private lastQuery: string = '';

    constructor(private settingService: SettingService) {

    }

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

    save(query: string) {
        this.lastQuery = query;
    }

    search(query: string): Promise<SearchResult[]> {
        return new Promise((resolve, reject) => {

            var request = require("request");

            let data = this.settingService.getDataSource();
            let formats = this.settingService.getFormats();

            let datastr: string = ''; let formatstr: string = '';
            for (let d of data) {
                datastr += d + ',';
            }

            for (let f of formats) {
                formatstr += f + ',';
            }

            var options = {
                method: 'GET',
                url: 'http://localhost:8080/search',
                qs:
                {
                    query: query,
                    datasets: datastr,
                    formats: formatstr
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
                console.log(obj);
                var result: SearchResult[] = [];
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
