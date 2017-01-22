import * as express from "express";
import { IResourceModel, ResourceRepository } from "../models/resource";

module Controller {

    export class Resource {

        private repo: ResourceRepository;

        constructor() {
            
            this.repo = new ResourceRepository();
        }

        public async create(resourceModel: IResourceModel) {
            
            try {
                this.repo.create(resourceModel);
            } catch (err) {
                console.log(err);
            }
        }

        public async getAll(): Promise<IResourceModel[]> {

            let resources = await this.repo.find({});
            return resources;
        }

        public async getById(id: string): Promise<IResourceModel> {
            let resource = await this.repo.findOne({id: id});
            return resource;
        }

        public async getByIds(ids: string[]): Promise<IResourceModel[]> {
            let resources: IResourceModel[] = [];
            for (let id of ids) {
                let resource = await this.repo.findOne({id: id});
                if (resource) {
                    resources.push(resource);
                }
            }
            return resources;
        }
    }
}
export = Controller;
