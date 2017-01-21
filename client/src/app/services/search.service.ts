import { Injectable } from "@angular/core";

import { DataSource } from "../domain/datasource.model";
import { ResourceResult, SearchResult } from '../domain/search-result.model';


@Injectable()
export class SearchService {

    search(query:string): Promise<SearchResult[]> {
        return new Promise((resolve, reject) => {
            resolve(null);
        });
    }
}
