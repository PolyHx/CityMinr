import * as request from "request";
import * as express from "express";
import { SearchResult } from "../models/search";
import { ITagModel } from "../models/tag";
import { Group } from "./group";

function test(format: string) {

    return format === this;
}

function findDataset(dataset: string) {

    return dataset === this;
}

function findTag(tag: ITagModel) {

    return tag.name.toLowerCase() === this.toLowerCase();
}

module Controller {

    export class Search {

        private group: Group;

        constructor() {

            this.group = new Group();
        }

        public async search(query: string, dataset: string[], formats: string[]): Promise<SearchResult[]> {

            let q = query.split(' ');
            let groups = await this.group.getAll();
            let result: SearchResult[] = [];

            for (let qq of q) {
                for (let group of groups) {
                    let ok = false;
                    if (group.name !== qq) {
                        for (let tag of group.tags) {
                            if (tag.name === qq) {
                                ok = true;
                                break;
                            }
                        }
                    }
                    if (!ok) {
                        continue;
                    }
                    for (let pack of group.packages) {

                        if (!dataset.find(findDataset, pack.dataset) || !pack.tags.find(findTag, qq)) {
                            continue;
                        }

                        for (let res of pack.resources) {

                            if (formats.find(test, res.format.toLowerCase())) {
                                result.push(pack);
                                break;
                            }
                        }
                    }
                }
            }
            return result;
        }
    }
}
export = Controller;