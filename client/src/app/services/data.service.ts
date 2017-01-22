import { environment } from '../../environments/environment';
import { Http } from '@angular/http';
import { Injectable } from "@angular/core";

@Injectable()
export class DataService {
    API_URL = environment.API_URL;

    constructor(private http: Http) {
    }

    getDataFromUrl(url: string) {
        return this.http.get(url).toPromise();
    }

    getHistory(email: string) {
        return this.http.get(this.API_URL + "/history/" + email).toPromise()
            .then((res) => res.json());
    }

    pushHistory(data: any) {
        return this.http.post(this.API_URL + "/history", data).toPromise()
            .then((res) => res.json());
    }

    getResources(table: string[]) {
        return this.http.post(this.API_URL + "/resource", {
            resources: table
        }).toPromise()
        .then((res) => res.json());
    }
}
