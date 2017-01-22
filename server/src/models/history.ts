import { IResourceModel } from './resource';
import * as mongoose from 'mongoose';
import { RepositoryBase } from './database';
export let Schema = mongoose.Schema;
export let ObjectId = mongoose.Schema.Types.ObjectId;
export let Mixed = mongoose.Schema.Types.Mixed;

export interface IHistoryModel extends mongoose.Document {
    userEmail: string;
    resources: string[];
    createdAt?: Date;
    modifiedAt?: Date;
}

let schema = new Schema({
    userEmail: {
        type: String,
        required: true
    },
    resources: {
        type: [String],
        required: false
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
        let doc = <IHistoryModel>this._doc;
        let now = new Date();
        if (!doc.createdAt) {
            doc.createdAt = now;
        }
        doc.modifiedAt = now;
    }
    next();
    return this;
});

export let HistorySchema = mongoose.model<IHistoryModel>("history", schema, "histories", true);

export class HistoryRepository extends RepositoryBase<IHistoryModel> {
    constructor() {
        super(HistorySchema);
    }
}
