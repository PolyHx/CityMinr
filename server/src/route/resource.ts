import * as express from 'express';
import * as ResourceController from '../controller/resource';

module Route {

    export class Resource {

        public router: express.Router;
        private resource: ResourceController.Resource;

        constructor() {
            this.router = express.Router();
            this.resource = new ResourceController.Resource();

            this.router.post("/", this.getResources.bind(this));
        }

        private async getResources(req: express.Request, res: express.Response) {
            
            let ids: string[] = req.body["resources"];
            if (ids.length > 0) {
                let resources = await this.resource.getByIds(ids);
                res.json({success: true, resources: resources});
            } else {
                res.status(400).json({success: false, msg: "No resources reveived"});
            }
        }
    }
}

export = Route;