import * as express from 'express';
import * as path from 'path';

module Route {

    export class Index {

        public router: express.Router;

        constructor() {
            this.router = express.Router();

            this.router.get("/", this.index);
        }

        private index(req: express.Request, res: express.Response) {

            res.sendFile(path.join(__dirname + "/../public/index.html"));
        }
    }
}

export = Route;