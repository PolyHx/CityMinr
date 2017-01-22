import * as mongoose from 'mongoose';
import { RepositoryBase } from './database';
export let Schema = mongoose.Schema;
export let ObjectId = mongoose.Schema.Types.ObjectId;
export let Mixed = mongoose.Schema.Types.Mixed;

export interface IResourceModel extends mongoose.Document {
    id: string;
    description?: string;
    name: string;
    format: string;
    url: string;
    size?: number;
    createdAt?: Date;
    modifiedAt?: Date;
}

let schema = new Schema({
    id: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: true
    },
    format: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    size: {
        type: Number,
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
        let doc = <IResourceModel>this._doc;
        let now = new Date();
        if (!doc.createdAt) {
            doc.createdAt = now;
        }
        doc.modifiedAt = now;
    }
    next();
    return this;
});

export let ResourceSchema = mongoose.model<IResourceModel>("resource", schema, "resources", true);

export class ResourceRepository extends RepositoryBase<IResourceModel> {
    constructor() {
        super(ResourceSchema);
    }
}
