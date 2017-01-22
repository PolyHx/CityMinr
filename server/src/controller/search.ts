import * as request from "request";
import * as express from "express";
import { SearchResult } from "../models/search";
import { Group } from "./group";

function test(format: string) {

    return format === this;
}

function findDataset(dataset: string) {

    return dataset === this;
}

module Controller {

    export class Search {

        private group: Group;

        constructor() {

            this.group = new Group();
        }

        public async search(query: string, dataset: string[], formats: string[]): Promise<SearchResult[]> {

            let group = await this.group.getByName(query);
            let result: SearchResult[] = [];

            for (let pack of group.packages) {

                if (!dataset.find(findDataset, pack.dataset)) {
                    continue;
                }
                
                for (let res of pack.resources) {
                    
                    if (formats.find(test, res.format.toLowerCase())) {
                        result.push(pack);
                        break;
                    }
                }
            }

            return result;
        }
    }
}
export = Controller;