import * as request from "request";
import * as express from "express";
import { PackageSearchResult } from "../models/city_data";
import { ITagModel, TagRepository, TagSchema } from "../models/tags";

module Controller {

    export class CityData {
         
         public async crawlData() {
            request.get("http://donnees.ville.montreal.qc.ca/api/3/action/package_search?q=*:*", async (err, res, body) => {
                    if (err) {
                        console.log("Error:" + err);
                    }
                    let response: PackageSearchResult = JSON.parse(body);
                    if (response.success) {
                        let tagRepo: TagRepository = new TagRepository();
                        for (let result of response.result.results) {
                            for (let tag of result.tags) {
                               let tmp = await tagRepo.findOne({name: tag.name.toLowerCase()});
                               if (!tmp) {
                                   tagRepo.create(<ITagModel>{ ids: new Array<string>(tag.id), name: tag.name.toLowerCase() });
                               } else {
                                   for (let id of tmp.ids) {
                                       if(id !== tag.id) {
                                           tmp.ids.push(tag.id);
                                           tmp.save();
                                       }
                                   }
                               }
                            }
                        }
                    } else {
                        console.log("no sucess!");
                    }
                    
            });
            
         }
    }
} 
export = Controller;