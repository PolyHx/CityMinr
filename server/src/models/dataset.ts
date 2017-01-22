import * as mongoose from 'mongoose';
import { RepositoryBase } from './database';
export let Schema = mongoose.Schema;
export let ObjectId = mongoose.Schema.Types.ObjectId;
export let Mixed = mongoose.Schema.Types.Mixed;

export interface IDatasetModel extends mongoose.Document {

    name: string;
    url: string;
    createdAt?: Date;
    modifiedAt?: Date;
}

let schema = new Schema({
   
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true 
    },
    createdAt: {
        type: Date,
        required: false
    },
    modifiedAt: {
        type: Date,
        required: false
    }

}).pre('save' , function(next) {
    if (this._doc) {
        let doc = <IDatasetModel>this._doc;
        let now = new Date();
        if (!doc.createdAt) {
            doc.createdAt = now;
        }
        doc.modifiedAt = now;
    }
    next();
    return this;
});

export let DatasetSchema = mongoose.model<IDatasetModel>("dataset", schema, "datasets", true);

export class DatasetRepository extends RepositoryBase<IDatasetModel> {
    constructor() {
        super(DatasetSchema);
    }
}
