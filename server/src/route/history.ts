import * as mongoose from 'mongoose';
import * as express from 'express';
import * as historyController from "../controller/history";

module Route {

    export class History {

        public router: express.Router;
        private history: historyController.History;

        constructor() {
            this.router = express.Router();
            this.history = new historyController.History();

            this.router.get("/:userEmail", this.getByUser.bind(this));
            this.router.post("/", this.create.bind(this));
        }

        private async create(req: express.Request, res: express.Response) {
            try {
                let history = await this.history.create(req.body);
                res.json({ success: true, msg: "Successfully saved." });
            } catch (err) {
                console.log(err);
                res.status(400).json({ success: false, msg: err });
            }
        }

        private async getByUser(req: express.Request, res: express.Response) {
            try {
                let histories = await this.history.getByUser(req.params.userEmail);
                res.json({ success: true, histories: histories });
            } catch (err) {
                res.status(400).json({ success: false, msg: err });
            }
        }
    }
}

export = Route;