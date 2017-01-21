import * as mongoose from 'mongoose';

const initialized = false;

export function initialize(database: string, username: string, password: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        if (initialized) {
            resolve(true);
        }

        mongoose.connect("mongodb://" + username + ":" + password + "@" + database, {
        }, (err) => {
            if (err) {
                console.log(err.message);
                console.log(err);
                reject(err);
            } else {
                console.log('Connected to MongoDb');
                resolve(true);
            }
        });
        resolve(true);
    });
}

export interface IRead<T> {
    retrieve: () => void;
    findById: (id: string) => Promise<T>;
    findOne(cond?: Object): Promise<T>;
    find(cond: Object, options: Object): Promise<T[]>;
}

export interface IWrite<T> {
    create: (item: T) => Promise<T>;
    update: (_id: mongoose.Types.ObjectId, item: T) => Promise<any>;
    delete: (_id: string) => Promise<any>;
}

export class RepositoryBase<T extends mongoose.Document> implements IRead<T>, IWrite<T> {

    private _model: mongoose.Model<mongoose.Document>;

    constructor(schemaModel: mongoose.Model<mongoose.Document>) {
        this._model = schemaModel;
    }
    create(item: T): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this._model.create(item, (err: any, res: T) => {

                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
    }

    retrieve(): Promise<T[]> {
        return new Promise<T[]>((resolve, reject) => {
            this._model.find({}, (err: any, res: T[]) => {

                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
    }

    update(_id: mongoose.Types.ObjectId, item: T): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this._model.update({_id: _id}, item, (err: any, raw: any) => {

                if (err) {
                    reject(err);
                } else {
                    resolve(raw);
                }
            });
        });
    }

    delete(_id: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this._model.remove({ _id: this.toObjectId(_id) }, (err: any) => {

                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    findById(_id: string): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this._model.findById({ _id: _id }, (err: any, res: T) => {

                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
    }

    findOne(cond?: Object): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this._model.findOne(cond, (err: any, res: T) => {

                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
    }

    find(cond?: Object, options?: Object): Promise<T[]> {
        return new Promise<T[]>((resolve, reject) => {
            this._model.find(cond, options, (err: any, res: T[]) => {

                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
    }

    private toObjectId(_id: string): mongoose.Types.ObjectId {
        return mongoose.Types.ObjectId.createFromHexString(_id);
    }
}
