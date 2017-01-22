import * as express from 'express';

module Route {

    export class Info {

        public router: express.Router;

        constructor() {
            this.router = express.Router();

            this.router.get("/", this.info.bind(this));
        }

        private info(req: express.Request, res: express.Response) {
            
            res.json({
                version: process.env.VERSION,
                run_config: process.env.NODE_ENV
            });
        }
    }
}

export = Route;