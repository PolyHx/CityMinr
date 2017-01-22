import * as express from "express";
import * as bodyParser from "body-parser";
import * as path from "path";
import * as logger from "morgan";
import * as cors from "cors";

import { initialize } from "./models/database";

import { Info } from "./route/info";
import { Index } from "./route/index";
import { Search } from "./route/search";
import { History } from "./route/history";
import { Resource } from "./route/resource";
import * as DatasetRoute from "./route/dataset";

import { CityData } from "./controller/city_data";
import { Dataset } from "./controller/dataset";

export class Server {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
        initialize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD);
        console.log("Started server v" + process.env.VERSION + " in " + process.env.NODE_ENV + " mode! Listening on port " + process.env.PORT + ".");
        this.crawl();
    }

    private config() {
        // this.app.set("views", path.join(__dirname + "/../src", "email"));
        // this.app.set("view engine", "jade");

        this.app.use(logger("dev"));
        this.app.use(cors());

        this.app.use(bodyParser.json({ limit: "50mb" }));
        this.app.use(bodyParser.urlencoded({ extended: true }));

        this.app.use(express.static(path.join(__dirname, "public")));
        this.app.use(express.static(path.join(__dirname, "bower_components")));

        this.app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
            let error = new Error("Not Found");
            err.status = 404;
            next(err);
        });

        process.env.PORT = 8087;
        process.env.VERSION = "0.0.1";
    }

    private routes() {
        let info: Info = new Info();
        let index: Index = new Index();
        let search: Search = new Search();
        let dataset: DatasetRoute.Dataset = new DatasetRoute.Dataset();
        let history: History = new History();
        let resource: Resource = new Resource();

        this.app.use("/", index.router);
        this.app.use("/search", search.router);
        this.app.use("/info", info.router);
        this.app.use("/dataset", dataset.router);
        this.app.use("/history", history.router);
        this.app.use("/resource", resource.router);
    }

    private async crawl() {
        // let controller: CityData = new CityData();
        // let datasetController: Dataset = new Dataset();
        // let datasets = await datasetController.getAll();
        // for (let dataset of datasets) {
        //     await controller.crawlData(dataset);
        // }
    }
}