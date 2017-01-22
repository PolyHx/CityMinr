import * as mongoose from 'mongoose';
import { RepositoryBase } from './database';
export let Schema = mongoose.Schema;
export let ObjectId = mongoose.Schema.Types.ObjectId;
export let Mixed = mongoose.Schema.Types.Mixed;

export interface ITagModel extends mongoose.Document {

    ids: string[];
    name: string;
    createdAt?: Date;
    modifiedAt?: Date;
}

let schema = new Schema({
    ids: {
        type: [String],
        required: true
    },
    name: {
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
        let doc = <ITagModel>this._doc;
        let now = new Date();
        if (!doc.createdAt) {
            doc.createdAt = now;
        }
        doc.modifiedAt = now;
    }
    next();
    return this;
});

export let TagSchema = mongoose.model<ITagModel>("tag", schema, "tags", true);

export class TagRepository extends RepositoryBase<ITagModel> {
    constructor() {
        super(TagSchema);
    }
}
