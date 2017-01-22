import * as request from "request";
import * as express from "express";
import { IGroupModel, GroupRepository } from "../models/groups";

module Controller {

    export class Group {
        private repo: GroupRepository;

        constructor() {
            
            this.repo = new GroupRepository();
        }

        public async create(groupModel: IGroupModel) {
            
            try {
                this.repo.create(groupModel);
            }
            catch (err) {
                console.log(err);
            }
        }

        public async getAll(): Promise<IGroupModel[]> {

            let groups = await this.repo.find({});
            return groups;
        }

        public async getByName(name: string): Promise<IGroupModel> {
           
            let group = await this.repo.findOne({name: name});
            return group;
        }
    }
}
export = Controller