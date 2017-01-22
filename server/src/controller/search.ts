import * as request from "request";
import * as express from "express";
import { SearchResult } from "../models/search";
import { ITagModel } from "../models/tag";
import { Group } from "./group";
import { Package } from "./package";

function test(format: string) {

    return format === this;
}

function findDataset(dataset: string) {

    return dataset === this;
}

function findTag(tag: ITagModel) {

    return tag.name.toLowerCase() === this.toLowerCase();
}

function findAutoComplete(auto: string) {

    return auto === this;
}

module Controller {

    export class Search {

        private group: Group;
        private package: Package;

        constructor() {

            this.group = new Group();
            this.package = new Package();
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

                            if (formats.find(test, res.format.toUpperCase())) {
                                result.push(pack);
                                break;
                            }
                        }
                    }
                }
            }
            return result;
        }

        public async autoComplete(query: string, dataset: string[], formats: string[]): Promise<string[]> {

            let q = query.split(' ');
            let qq = q[q.length - 1];
            let packages = await this.package.getAll();
            let result: string[] = [];

            if (qq.length < 3) {
                return result;
            }

            for (let pack of packages) {
                let ok = false;

                if (!dataset.find(findDataset, pack.dataset)) {
                    continue;
                }

                for (let res of pack.resources) {

                    if (formats.find(test, res.format.toLowerCase())) {
                        ok = true;
                        break;
                    }
                }

                if (!ok) {
                    continue;
                }

                for (let tag of pack.tags) {

                    if (tag.name.startsWith(qq)) {
                        if (!result.find(findAutoComplete, tag.name)) {
                            result.push(tag.name);
                        }
                    }
                }
            }

            return result;
        }
    }
}
export = Controller;