import * as express from 'express';
import * as datasetController from "../controller/dataset";

module Route {

    export class Dataset {

        public router: express.Router;
        private dataset: datasetController.Dataset;

        constructor() {
            this.router = express.Router();
            this.dataset = new datasetController.Dataset();

            this.router.get("/", this.getAll);
        }

        private async getAll(req: express.Request, res: express.Response) {
            
            try {
                let datasets = await this.dataset.getAll();
                res.json({success: true, datasets: datasets});
            } catch (err) {
                res.status(400).json({success: false, msg: err});
            }
        }
    }
}

export = Route;