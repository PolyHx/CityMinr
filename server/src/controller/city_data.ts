import * as request from "request";
import * as express from "express";
import { PackageSearchResult } from "../models/city_data";
import { ITagModel, TagRepository } from "../models/tag";
import { IResourceModel, ResourceRepository } from "../models/resource";
import { IGroupModel, GroupRepository } from "../models/group";
import { IPackageModel, PackageRepository } from "../models/package";
import { IDatasetModel } from "../models/dataset";

module Controller {

    export class CityData {
        public async crawlData(dataset: IDatasetModel) {
            request.get(dataset.url + "/action/package_search?q=*:*&rows=1000", async (err, res, body) => {
                if (err) {
                    console.log("Error:" + err);
                }
                try {
                    let response: PackageSearchResult = JSON.parse(body);
                    if (response.success) {
                        let tagRepo: TagRepository = new TagRepository();
                        let resRepo: ResourceRepository = new ResourceRepository();
                        let groupRepo: GroupRepository = new GroupRepository();
                        let packageRepo: PackageRepository = new PackageRepository();
                        for (let result of response.result.results) {
                            let packtemp = await packageRepo.findOne({ id: result.id });
                            if (!packtemp) {
                                packtemp = await packageRepo.create(<IPackageModel>{
                                    id: result.id,
                                    dataset: dataset._id,
                                    license_title: result.license_title,
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
                            for (let resource of result.resources) {
                                let tmp = await resRepo.findOne({ id: resource.id });
                                if (!tmp) {
                                    if (resource.format) {
                                        let isValid = true;
                                        let respo = await request.get(resource.url, (err, res) => {
                                            if (err) {
                                                isValid = false;
                                            }
                                        });
                                        if (isValid) {
                                            let res = await resRepo.create(<IResourceModel>{
                                                id: resource.id,
                                                description: resource.description,
                                                name: resource.name,
                                                format: resource.format,
                                                url: resource.url,
                                                size: resource.size
                                            });
                                            packtemp.resources.push(res);
                                            packtemp.save();
                                        }
                                    }
                                }
                            }
                            for (let group of result.groups) {
                                let tmp = await groupRepo.findOne({ name: group.name.toLowerCase() });
                                if (!tmp) {
                                    tmp = await groupRepo.create(<IGroupModel>{
                                        ids: new Array<string>(group.id),
                                        packages: [],
                                        description: group.description,
                                        title: group.title,
                                        name: group.name.toLowerCase(),
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
                                let isPresent: boolean = false;
                                for (let pack of tmp.packages) {
                                    if (pack.id === packtemp.id) {
                                        isPresent = true;
                                        break;
                                    }
                                }
                                if (!isPresent) {
                                    tmp.packages.push(packtemp);
                                    tmp.save();
                                }
                            }
                        }
                    } else {
                        console.log("no sucess!");
                    }
                } catch (err) {
                    console.log(err);
                    this.crawlData(dataset);
                }
            });
        }
    }
}
export = Controller;