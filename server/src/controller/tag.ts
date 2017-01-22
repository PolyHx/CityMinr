import * as express from "express";
import { ITagModel, TagRepository } from "../models/tag";

module Controller {

    export class Tag {

        private repo: TagRepository;

        constructor() {
            
            this.repo = new TagRepository();
        }

        public async create(tagModel: ITagModel) {
            
            try {
                this.repo.create(tagModel);
            } catch (err) {
                console.log(err);
            }
        }

        public async getAll(): Promise<ITagModel[]> {

            let tags = await this.repo.find({});
            return tags;
        }

        public async getByName(name: string): Promise<ITagModel> {
           
            let tag = await this.repo.findOne({name: name.toLowerCase()});
            return tag;
        }
    }
}
export = Controller;