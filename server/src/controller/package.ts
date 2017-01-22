import * as express from "express";
import { IPackageModel, PackageRepository } from "../models/package";

module Controller {

    export class Package {

        private repo: PackageRepository;

        constructor() {
            
            this.repo = new PackageRepository();
        }

        public async create(packageModel: IPackageModel) {
            
            try {
                this.repo.create(packageModel);
            } catch (err) {
                console.log(err);
            }
        }

        public async getAll(): Promise<IPackageModel[]> {

            let packages = await this.repo.find({});
            return packages;
        }

        public async getById(id: string): Promise<IPackageModel> {
           
            let packageFound = await this.repo.findOne({id: id});
            return packageFound;
        }
    }
}
export = Controller;