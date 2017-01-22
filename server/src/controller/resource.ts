import * as express from "express";
import { IResourceModel, ResourceRepository } from "../models/ressources";

module Controller {

    export class Resource {

        private repo: ResourceRepository;

        constructor() {

            this.repo = new ResourceRepository();
        }

        public async getAll(): Promise<IResourceModel[]> {

            let resources = await this.repo.find({});
            return resources;
        }

        public async getById(id: string): Promise<IResourceModel> {

            let resource = await this.repo.findOne({id: id});
            return resource;
        }
    }
}
export = Controller;