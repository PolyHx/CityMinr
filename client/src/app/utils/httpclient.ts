import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class HttpClient {
    constructor(private http: Http) {
    }

    createAuthorizationHeader(headers: Headers) {
        // let token = localStorage.getItem("token");
        // headers.append('x-access-token', "token");
    }

    get(url) {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.get(url, {
            headers: headers
        }).toPromise()
        .then((res) => res.json());
    }

    post(url, data) {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.post(url, data, {
            headers: headers
        }).toPromise()
        .then((res) => res.json());
    }

    put(url, data) {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.put(url, data, {
            headers: headers
        }).toPromise()
        .then((res) => res.json());
    }

    delete(url, data) {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.delete(url, {
            headers: headers
        }).toPromise()
        .then((res) => res.json());
    }

}