import * as express from 'express';
import * as path from 'path';

module Route {

    export class Search {

        public router: express.Router;

        constructor() {
            this.router = express.Router();

            this.router.get("/", this.search);
        }

        private search(req: express.Request, res: express.Response) {

            res.json({text: "Fuck Richer"});
        }
    }
}

export = Route;