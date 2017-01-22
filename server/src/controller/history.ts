import * as express from "express";
import { IHistoryModel, HistoryRepository } from "../models/history";

module Controller {

    export class History {

        private repo: HistoryRepository;

        constructor() {

            this.repo = new HistoryRepository();
        }

        public async create(historyModel: IHistoryModel) {
            try {
                this.repo.create(historyModel);
            } catch (err) {
                console.log(err);
            }
        }

        public async getByUser(userEmail: string): Promise<IHistoryModel> {
            let history = await this.repo.findOne({ userEmail: userEmail });
            return history;
        }
    }
}
export = Controller;
