import * as request from "request";
import * as express from "express";
import { PackageSearchResult } from "../models/city_data";
import { ITagModel, TagRepository } from "../models/tags";
import { IResourceModel, ResourceRepository } from "../models/ressources";
import { IGroupModel, GroupRepository } from "../models/groups";
import { IPackageModel, PackageRepository } from "../models/package";

module Controller {

    export class CityData {
        public async crawlData(url: string) {
            request.get(url + "/action/package_search?q=*:*&rows=1000", async (err, res, body) => {
                if (err) {
                    console.log("Error:" + err);
                }
                let response: PackageSearchResult = JSON.parse(body);
                if (response.success) {
                    let tagRepo: TagRepository = new TagRepository();
                    let resRepo: ResourceRepository = new ResourceRepository();
                    let groupRepo: GroupRepository = new GroupRepository();
                    let packageRepo: PackageRepository = new PackageRepository();
                    for (let result of response.result.results) {
                        let packtemp = await packageRepo.findOne({ id: result.id });
                        if (!packtemp) {
                            packageRepo.create(<IPackageModel>{
                                id: result.id,
                                metadata_modified: result.metadata_modified,
                                language: result.language,
                                methodologie: result.methodologie,
                                name: result.name,
                                title: result.title,
                                resources: []
                            });
                        }
                        for (let tag of result.tags) {
                            let tmp = await tagRepo.findOne({ name: tag.name.toLowerCase() });
                            if (!tmp) {
                                tagRepo.create(<ITagModel>{ ids: new Array<string>(tag.id), name: tag.name.toLowerCase() });
                            } else {
                                let isPresent: boolean = false;
                                for (let id of tmp.ids) {
                                    if (id === tag.id) {
                                        isPresent = true;
                                        break;
                                    }
                                }
                                if (!isPresent) {
                                    tmp.ids.push(tag.id);
                                    tmp.save();
                                }
                            }
                        }
                        for (let group of result.groups) {
                            let tmp = await groupRepo.findOne({ id: group.id });
                            if (!tmp) {
                                groupRepo.create(<IGroupModel>{
                                    ids: new Array<string>(group.id),
                                    description: group.description,
                                    title: group.title,
                                    name: group.name,
                                    image_display_url: group.image_display_url
                                });
                            } else {
                                let isPresent: boolean = false;
                                for (let id of tmp.ids) {
                                    if (id === group.id) {
                                        isPresent = true;
                                        break;
                                    }
                                }
                                if (!isPresent) {
                                    tmp.ids.push(group.id);
                                    tmp.save();
                                }
                            }
                        }
                        for (let resource of result.resources) {
                            let tmp = await resRepo.findOne({ id: resource.id });
                            if (!tmp) {
                                if (resource.format) {
                                    resRepo.create(<IResourceModel>{
                                        id: resource.id,
                                        description: resource.description,
                                        name: resource.name,
                                        format: resource.format,
                                        url: resource.url,
                                        size: resource.size
                                    });
                                    packtemp.resources.push(resource.id);
                                    packtemp.save();
                                }
                            }
                        }
                    }
                } 
            });
        }
    }
}
export = Controller;