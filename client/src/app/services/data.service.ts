import { Http } from '@angular/http';
import { Injectable } from "@angular/core";

@Injectable()
export class DataService {

    constructor(private http: Http) {
    }

    getDataFromUrl(url: string) {
        return this.http.get(url).toPromise();
    }
}
