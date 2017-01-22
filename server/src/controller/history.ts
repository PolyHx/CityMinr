import * as express from "express";
import { IHistoryModel, HistorySchema, HistoryRepository } from "../models/history";

module Controller {

    export class History {

        private repo: HistoryRepository;

        constructor() {

            this.repo = new HistoryRepository();
        }

        public async create(historyModel: IHistoryModel) {
            try {
                return HistorySchema.create(historyModel);
            } catch (err) {
                console.log(err);
            }
        }

        public async getByUser(userEmail: string): Promise<IHistoryModel[]> {
            return HistorySchema.find({ userEmail: userEmail });
        }
    }
}
export = Controller;
