import * as request from "request";
import * as express from "express";
import { IDatasetModel, DatasetRepository } from "../models/dataset";

module Controller {

    export class Dataset {

        private repo: DatasetRepository;

        constructor() {

            this.repo = new DatasetRepository();
        }

        public async getAll(): Promise<IDatasetModel[]> {

            let datasets = await this.repo.find({});
            return datasets;
        }

        public async getByName(name: string): Promise<IDatasetModel> {

            let dataset = await this.repo.findOne({name: name});
            return dataset;
        }
    }
}
export = Controller;