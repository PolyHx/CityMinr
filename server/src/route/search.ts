import * as express from 'express';
import * as path from 'path';
import * as SearchController from '../controller/search';

module Route {

    export class Search {

        public router: express.Router;
        private searchController: SearchController.Search;

        constructor() {
            this.router = express.Router();
            this.searchController = new SearchController.Search();

            this.router.get("/", this.search.bind(this));
            this.router.get("/autocomplete", this.autocomplete.bind(this));
        }

        private async search(req: express.Request, res: express.Response) {

            if (!req.query["query"] || !req.query["datasets"] || !req.query["formats"]) {
                res.status(400).json({ success: false, msg: "Query is not valid" });
            } else {
                try {
                    let datasets = (<string>req.query["datasets"]).split(',');
                    let formats = (<string>req.query["formats"]).split(',');
                    let result = await this.searchController.search(req.query["query"], datasets, formats);
                    res.json({success: true, response: result});
                } catch (err) {
                    res.status(400).json({ success: false, msg: err });
                }
            }
        }

        private async autocomplete(req: express.Request, res: express.Response) {

            if (!req.query["query"] || !req.query["datasets"] || !req.query["formats"]) {
                res.status(400).json({ success: false, msg: "Query is not valid" });
            } else {
                try {
                    let datasets = (<string>req.query["datasets"]).split(',');
                    let formats = (<string>req.query["formats"]).split(',');
                    let result = await this.searchController.autoComplete(req.query["query"], datasets, formats);
                    res.json({success: true, response: result});
                } catch (err) {
                    res.status(400).json({ success: false, msg: err });
                }
            }
        }
    }
}

export = Route;